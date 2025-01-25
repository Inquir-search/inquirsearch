import React, { createContext, useContext, useRef, useMemo, useSyncExternalStore } from 'react';
import { SearchManager } from '@inquir/inquirsearch';
import { MessagesManager } from '@inquir/inquirsearch';

const SearchContext = createContext({});

export const SearchProvider = (props) => {
    const { debounce, apiKey, indexName, children, baseUrl, ...state } = props
    const { current: searchManager } = useRef(new SearchManager({
        apiKey,
        indexName,
        debounce,
        state
    }));
    const { current: messagesManager } = useRef(new MessagesManager({
        baseUrl,
        apiKey
    }));

    const value = useMemo(() => ({
        searchManager,
        messagesManager
    }), [searchManager, messagesManager]);

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

export const useMessagesManager = () => {
    const context = useContext(SearchContext);
    const state = useSyncExternalStore(
        context.messagesManager.subscribe.bind(context.messagesManager),
        context.messagesManager.getState.bind(context.messagesManager)
    );

    return { manager: context.messagesManager, state };
};