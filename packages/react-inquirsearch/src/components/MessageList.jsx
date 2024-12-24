import React, { useEffect, useRef } from 'react';
import Bubble from './Bubble';
import * as styles from './MessageList.module.css';

const MessageList = ({ messages, isLoading, renderMessage }) => {
    return (
        <div className={styles.messageList}>
            {messages.map((msg, index) => (
                <Bubble
                    key={index}
                    message={msg.message}
                    sender={msg.sender}
                    timestamp={new Date()}
                    dangerouslySetInnerHTML={renderMessage(msg.message)}
                />
            ))}
            {isLoading && (
                <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            )}
        </div>
    );
};

export default MessageList;