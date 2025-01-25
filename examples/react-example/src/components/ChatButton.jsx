import React from 'react';
import styles from './ChatButton.module.css';

export const ChatButton = ({ onClick }) => (
  <button className={styles.chatButton} onClick={onClick}>
    <span>Chat</span>
  </button>
);