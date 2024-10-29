import React, { useState, useEffect } from 'react';
import { useSearchManager } from '../context/SearchProvider';
import * as styles from './SearchBox.module.css';

const SearchBox = () => {
    const searchManager = useSearchManager();
    const [query, setQuery] = useState(searchManager.state.query);

    useEffect(() => {
        const unsubscribeQuery = searchManager.subscribe((state) => {
            setQuery(state.query);
        });

        return () => {
            unsubscribeQuery();
        };
    }, [searchManager]);

    const handleInputChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        searchManager.updateQuery(newQuery);
        searchManager.executeSearch();
    };

    const handleClear = () => {
        setQuery('');
        searchManager.updateQuery('');
        searchManager.executeSearch();
    };
    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search..."
                    className={styles.searchInput}
                />
                {query && <button onClick={handleClear} className={styles.clearButton}>×</button>}
            </div>
        </div>
    );
};

export default SearchBox;
