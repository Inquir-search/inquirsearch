import { ReactNode } from 'react';

export interface SearchState {
    query: string;
}

export interface SearchContextValue {
    state: SearchState;
    updateQuery: (query: string) => void;
    executeSearch: () => void;
    on: (event: string, callback: (data: any) => void) => () => void;
    subscribe: (callback: (state: SearchState) => void) => () => void;
}

export interface SearchProviderProps {
    children: ReactNode;
    apiKey: string;
    baseUrl?: string;
}

export function useSearchManager(): SearchContextValue;
export function useSearchState(): SearchState;

export const SearchProvider: React.FC<SearchProviderProps>;
export default SearchProvider;