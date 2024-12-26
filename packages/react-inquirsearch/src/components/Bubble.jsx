import React from 'react';
import PropTypes from 'prop-types';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import * as styles from './Bubble.module.css';

const Bubble = ({
    message,
    sender,
    style,
    className,
    timestamp = new Date(),
    status = 'sent'
}) => {
    React.useEffect(() => {
        Prism.highlightAll();
    }, [message]);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code)
            .then(() => alert('Code copied!'))
            .catch(err => console.error('Failed to copy:', err));
    };

    const renderMessage = () => {
        marked.setOptions({
            highlight: (code, lang) => {
                if (lang && Prism.languages[lang]) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                }
                return code;
            },
            breaks: true
        });

        const html = marked(message);
        return { __html: html };
    };

    const formatTime = (date) => {
        return new Intl.DateTimeFormat('en', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <div
            className={`
                ${styles.bubble} 
                ${sender === 'user' ? styles.userBubble : styles.botBubble}
                ${className}
            `}
            style={style}
        >
            <div
                dangerouslySetInnerHTML={renderMessage()}
                className={styles.message}
                onClick={(e) => {
                    if (e.target.tagName === 'PRE') {
                        handleCopy(e.target.textContent);
                    }
                }}
            />
            <div className={styles.tail} />
            <div className={styles.timestamp}>
                {formatTime(timestamp)}
                {sender === 'user' && (
                    <span className={styles.status}>
                        {status === 'read' && '✓✓'}
                        {status === 'delivered' && '✓'}
                        {status === 'sent' && '•'}
                    </span>
                )}
            </div>
        </div>
    );
};

Bubble.propTypes = {
    message: PropTypes.string.isRequired,
    sender: PropTypes.oneOf(['user', 'bot']).isRequired,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    borderRadius: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
    status: PropTypes.oneOf(['sent', 'delivered', 'read']),
};

export default Bubble;