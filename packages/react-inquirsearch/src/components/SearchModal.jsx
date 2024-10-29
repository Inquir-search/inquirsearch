import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import ReactDOM from 'react-dom';
import SearchResults from './SearchResults';
import { useSearchManager } from '../context/SearchProvider'
import * as styles from './SearchModal.module.css'; // CSS for styling modal

function getOS() {
    if (navigator.userAgentData) {
        const platform = navigator.userAgentData.platform.toLowerCase();
        if (platform.includes('mac')) {
            return 'macos';
        } else if (platform.includes('win')) {
            return 'windows';
        }
    } else {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('mac')) {
            return 'macos';
        } else if (userAgent.includes('windows')) {
            return 'windows';
        }
    }
    return void ('unknown');
}

const SearchModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContainer, setModalContainer] = useState(null);
    const searchManager = useSearchManager();
    const [query, setQuery] = useState('');
    const OS = getOS();

    useEffect(() => {
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'search-modal-root');
        document.body.appendChild(modalRoot);
        setModalContainer(modalRoot);
        const unsubscibe = searchManager
            .on('queryChange', ({ query }) => setQuery(query))
        return () => {
            unsubscibe();
            document.body.removeChild(modalRoot);
        };
    }, []);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        searchManager.updateQuery('')
        setIsOpen(false);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                openModal();
            }
            if (event.key === 'Escape') {
                searchManager.updateQuery('');
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
                <svg viewBox="0 0 20 20" fill="currentColor"><path d="M19.71,18.29,16,14.61A9,9,0,1,0,14.61,16l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,19.71,18.29ZM2,9a7,7,0,1,1,12,4.93h0s0,0,0,0A7,7,0,0,1,2,9Z"></path></svg>
                <div className={styles.openButtonLabel}>Click to search</div>
                <div style={{ display: 'flex', marginLeft: 'auto' }}>
                    {(OS === 'windows' || !OS) && <kbd className={styles.openButton_kbd}>Ctl</kbd>}
                    {OS === 'macos' && <kbd className={styles.openButton_kbd}>⌘</kbd>}
                    <kbd className={styles.openButton_kbd}>K</kbd>
                </div>
            </button>
            {isOpen && ReactDOM.createPortal(
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex' }}>
                            <SearchBox />
                            <div className={styles.vertialDelimiter} />
                            <button className={styles.closeButton} onClick={closeModal}>Cancel</button>
                        </div>
                        {
                            !!query.length &&
                            <>
                                <div className={styles.searchWrapper}><SearchResults /></div>
                                <footer className={styles.footer}>
                                    <div className={styles.footerLabel}>
                                        Search by
                                        <img src='https://inquir.org/assets/inquire-logo.svg' alt='inquir' />
                                    </div>
                                </footer>
                            </>
                        }
                    </div>
                </div>,
                modalContainer
            )}
        </>
    );
};

export default SearchModal;