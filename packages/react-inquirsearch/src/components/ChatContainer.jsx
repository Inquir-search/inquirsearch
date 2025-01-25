import React, { useEffect, useState, useCallback, useRef } from 'react';
import { marked } from 'marked';
import { useMessagesManager } from '../context/SearchProvider';
import PropTypes from 'prop-types';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import * as styles from './ChatContainer.module.css';

export default function ChatContainer({
    indexName,
    onError,
    initialMessages = []
}) {
    const [error, setError] = useState(null);
    const { manager, state } = useMessagesManager();
    const messagesWrapperRef = useRef(null);
    const isInitialized = useRef(false);

    useEffect(() => {
        if (manager && initialMessages.length > 0 && !isInitialized.current) {
            initialMessages.forEach(msg => {
                manager.addMessage(msg.message, msg.sender);
            });
            isInitialized.current = true;
        }
    }, [manager, initialMessages]);

    const handleError = useCallback((err) => {
        setError(err);
        onError?.(err);
    }, [onError]);

    useEffect(() => {
        manager.on('error', handleError);
        return () => {
            manager.off('error', handleError);
        };
    }, [manager, handleError]);

    const handleSendMessage = async (message) => {
        if (!manager) return;
        try {
            setError(null);
            await manager.sendMessage({
                indexName,
                query: message
            });
        } catch (err) {
            handleError(err);
        }
    };

    const renderMessage = useCallback((message) => {
        return { __html: marked(message) };
    }, []);

    useEffect(() => {
        if (messagesWrapperRef.current) {
            const wrapper = messagesWrapperRef.current;
            const distanceFromBottom = wrapper.scrollHeight - wrapper.scrollTop - wrapper.clientHeight;

            if (distanceFromBottom < 100) {
                wrapper.scrollTop = wrapper.scrollHeight;
            }
        }
    }, [manager?.messages]);

    if (!manager) {
        return <div className={styles.loading}>Initializing chat...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.messagesWrapper} ref={messagesWrapperRef}>
                <MessageList
                    messages={manager.messages}
                    isLoading={state.loading}
                    renderMessage={renderMessage}
                />
            </div>
            {error && (
                <div className={styles.error}>
                    {error.message || 'An error occurred'}
                </div>
            )}
            <MessageInput
                onSend={handleSendMessage}
                disabled={state.loading}
            />
        </div>
    );
}

ChatContainer.propTypes = {
    indexName: PropTypes.string.isRequired,
    onError: PropTypes.func,
    initialMessages: PropTypes.arrayOf(PropTypes.shape({
        message: PropTypes.string.isRequired,
        sender: PropTypes.oneOf(['user', 'bot']).isRequired
    }))
};
