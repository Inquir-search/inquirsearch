import React, { useEffect, useState, useCallback, useRef } from 'react';
import { marked } from 'marked';
import { MessagesManager } from '@inquir/inquirsearch';
import PropTypes from 'prop-types';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import * as styles from './ChatContainer.module.css';

/**
 * TODO:
 * Add context support
 */
export default function ChatContainer({
    apiKey,
    baseUrl = 'https://platform.inquir.org',
    indexName,
    onError,
    initialMessages = []
}) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [manager, setManager] = useState(null);
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

    const handleStateUpdate = useCallback((state) => {
        console.log('State updated:', state);
        const messagesList = Array.from(state.messages.values());
        messagesList.forEach((message) => {
            console.log('Message:', message);
        });
        setMessages(messagesList);
        setIsLoading(state.loading);
    }, []);

    const handleError = useCallback((err) => {
        setError(err);
        onError?.(err);
        setIsLoading(false);
    }, [onError]);

    useEffect(() => {
        try {
            const messagesManager = new MessagesManager({
                baseUrl,
                apiKey
            });

            messagesManager.on('update', handleStateUpdate);
            messagesManager.on('error', handleError);
            messagesManager.on('loading', setIsLoading);

            setManager(messagesManager);

            return () => {
                messagesManager.off('update', handleStateUpdate);
                messagesManager.off('error', handleError);
                messagesManager.off('loading', setIsLoading);
            };
        } catch (err) {
            handleError(err);
        }
    }, [apiKey, baseUrl, handleStateUpdate, handleError]);

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
    }, [messages]);

    if (!manager) {
        return <div className={styles.loading}>Initializing chat...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.messagesWrapper} ref={messagesWrapperRef}>
                <MessageList
                    messages={messages}
                    isLoading={isLoading}
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
                disabled={isLoading}
            />
        </div>
    );
};

ChatContainer.propTypes = {
    apiKey: PropTypes.string.isRequired,
    baseUrl: PropTypes.string,
    indexName: PropTypes.string.isRequired,
    onError: PropTypes.func,
    initialMessages: PropTypes.arrayOf(PropTypes.shape({
        message: PropTypes.string.isRequired,
        sender: PropTypes.oneOf(['user', 'bot']).isRequired
    }))
};
