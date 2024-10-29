import React, { createContext, useContext, useRef, useMemo } from 'react';
import { SearchManager } from '@inquir/inquirsearch';

const SearchContext = createContext({});

export const SearchProvider = ({ apiKey, indexName, children }) => {
    const { current: searchManager } = useRef(new SearchManager({ apiKey, indexName }));

    const value = useMemo(() => ({
        searchManager,
    }), [searchManager]);

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchManager = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchManager must be used within a SearchProvider');
    }
    return context.searchManager;
};
