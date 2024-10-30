import React, { useState, useEffect, useRef } from 'react';
import { useSearchResults } from '../hooks/useSearchResults';
import * as styles from './SearchResults.module.css';
import { useSearchManager } from '../context/SearchProvider';

const SearchResults = () => {
    const { results = [], error, isLoading } = useSearchResults();
    const searchManager = useSearchManager();
    const [activeIndex, setActiveIndex] = useState(0);
    const itemRefs = useRef([]);
    const isScrolling = useRef(false);
    const inputMethod = useRef('keyboard');
    const setActive = (index) => () => {
        if (inputMethod.current === 'mouse' && !isScrolling.current) {
            setActiveIndex(index);
        }
    };

    useEffect(() => {
        const handleMouseMove = () => {
            inputMethod.current = 'mouse';
        };

        const handleKeyDown = (e) => {
            inputMethod.current = 'keyboard'; // Track that the keyboard is being used
            if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) e.preventDefault();
            if (results.length === 0) return;

            if (e.key === 'ArrowDown') {
                setActiveIndex((prevIndex) =>
                    prevIndex === results.length - 1 ? 0 : prevIndex + 1
                );
            } else if (e.key === 'ArrowUp') {
                setActiveIndex((prevIndex) =>
                    prevIndex === 0 ? results.length - 1 : prevIndex - 1
                );
            } else if (e.key === 'Enter') {
                const activeItem = results[activeIndex];
                if (activeItem) {
                    window.open(activeItem.clickUri, '_blank');
                }
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [results, activeIndex]);

    useEffect(() => {
        if (itemRefs.current[activeIndex] && inputMethod.current === 'keyboard') {
            itemRefs.current[activeIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [activeIndex, results]);

    if (isLoading) {
        return <div className={styles.loadingContainer}>
            <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path d="M 27.985 38.62 L 24.275 34.94 C 28.609 29.536 25.468 21.465 18.62 20.414 C 11.772 19.362 6.354 26.118 8.867 32.574 C 11.072 38.239 18.143 40.134 22.885 36.33 L 26.565 40.01 C 26.956 40.405 27.594 40.405 27.985 40.01 C 28.359 39.623 28.359 39.008 27.985 38.62 Z M 10.275 29.33 C 10.299 23.942 16.147 20.6 20.802 23.315 C 24.741 25.613 25.466 31.003 22.275 34.26 C 22.275 34.26 22.275 34.26 22.275 34.26 C 18.504 38.109 11.98 36.433 10.532 31.242 C 10.358 30.62 10.272 29.976 10.275 29.33 Z">
                    <animateMotion
                        path="M 0 0 C -9.668 -11.495 6.014 -24.456 16.167 -14.984"
                        calcMode="linear"
                        dur="0.75s"
                        fill="freeze"
                        begin="0s; anim2.end"
                        id="anim1"
                    ></animateMotion>
                    <animateMotion
                        path="M 16.234 -14.926 C 25.782 -2.12 9.573 8.764 -0.056 0.014"
                        calcMode="linear"
                        begin="anim1.end"
                        dur="0.75s"
                        fill="freeze"
                        id="anim2"
                    ></animateMotion>
                </path>
            </svg >
            <p>Search for results...</p>
        </div >
    }

    if (!isLoading && error) {
        return <div>Error: {error.message}</div>;
    }

    if (results.length === 0) {
        return (
            <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div className={styles.nothing}>
                    <svg viewBox="0 0 20 20" fill="none"><path d="M15.5 4.8c2 3 1.7 7-1 9.7h0l4.3 4.3-4.3-4.3a7.8 7.8 0 01-9.8 1m-2.2-2.2A7.8 7.8 0 0113.2 2.4M2 18L18 2"></path></svg>
                    <span>Nothing found for: <b>"{searchManager.state.query || ''}"</b></span>
                </div>
            </div>
        );
    }

    return (
        <ul role="listbox" className={styles.listbox}>
            {results.map((result, index) => (
                <li
                    role="option"
                    key={index}
                    className={styles.item}
                    aria-selected={index === activeIndex}
                    onMouseEnter={setActive(index)}
                    ref={(el) => (itemRefs.current[index] = el)}
                >
                    <a
                        className={`${styles.link} ${index === activeIndex ? styles.active : ''}`}
                        target="_blank"
                        href={result.clickUri}
                    >
                        <div>
                            <div className={styles.itemTitle}>
                                {result.title}
                            </div>
                            <div className={styles.itemSnippet}>
                                {result.body.split(' ').slice(0, 5).join(' ')}
                            </div>
                        </div>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default SearchResults;
