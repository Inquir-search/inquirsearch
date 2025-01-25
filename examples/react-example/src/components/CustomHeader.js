import styles from './CustomHeader.module.css';

export const CustomHeader = ({ title, onClose, onMinimize }) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <div className={styles.controls}>
        <button onClick={onMinimize} className={styles.controlButton}>
          <span>−</span>
        </button>
        <button onClick={onClose} className={styles.controlButton}>
          <span>×</span>
        </button>
      </div>
    </div>
  );
};