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
        <div className={styles.v39_337}>
            <div className={styles.v39_338}>
                <div className={styles.searchBox}>
                    <form className={styles.searchBoxForm} id="inquir_serach_form" style={{ flex: 1 }}>
                        <label htmlFor='inquir-search' className={styles.searchIcon}>
                            <svg viewBox="0 0 20 20" fill="currentColor"><path d="M19.71,18.29,16,14.61A9,9,0,1,0,14.61,16l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,19.71,18.29ZM2,9a7,7,0,1,1,12,4.93h0s0,0,0,0A7,7,0,0,1,2,9Z"></path></svg>
                        </label>
                        <input
                            autoComplete="off"
                            id='inquir-search'
                            name='inquir-search'
                            autoFocus
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Search..."
                            className={styles.searchInput}
                        />
                    </form>
                    {query && (
                        <button onClick={handleClear} className={styles.clearButton}>
                            ×
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
