import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import ReactDOM from 'react-dom';
import SearchResults from './SearchResults';
import * as styles from './SearchModal.module.css'; // CSS for styling modal

const SearchModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContainer, setModalContainer] = useState(null);

    useEffect(() => {
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'search-modal-root');
        document.body.appendChild(modalRoot);
        setModalContainer(modalRoot);

        return () => {
            document.body.removeChild(modalRoot);
        };
    }, []);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                openModal();
            }
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (!modalContainer) return null;

    return (
        <>
            <button className={styles.openButton} onClick={openModal}>
                Open Search
            </button>

            {isOpen && ReactDOM.createPortal(
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={closeModal}>×</button>
                        <SearchBox />
                        <SearchResults />
                    </div>
                </div>,
                modalContainer
            )}
        </>
    );
};

export default SearchModal;