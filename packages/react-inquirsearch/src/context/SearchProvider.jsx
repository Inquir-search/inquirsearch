import React, { createContext, useContext, useRef, useMemo } from 'react';
import { SearchManager } from '@inquir/inquirsearch';

const SearchContext = createContext({});

export const SearchProvider = (props) => {
    const { debounce, apiKey, indexName, children, ...state } = props
    const { current: searchManager } = useRef(new SearchManager({ apiKey, indexName, debounce, state }));

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
