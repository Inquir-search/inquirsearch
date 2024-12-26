import React, { useState } from 'react';
import * as styles from './MessageInput.module.css';

const MessageInput = ({ onSend, disabled }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <form className={styles.inputContainer} onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                disabled={disabled}
                className={styles.input}
            />
            <button 
                type="submit" 
                disabled={disabled || !message.trim()}
                className={styles.sendButton}
            >
                Send
            </button>
        </form>
    );
};

export default MessageInput;