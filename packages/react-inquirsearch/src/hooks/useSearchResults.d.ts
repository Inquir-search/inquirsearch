export interface SearchResult {
    title: string;
    clickUri: string;
    body: string;
    [key: string]: any;
}

export interface SearchResultsHookResult {
    isLoading: boolean;
    results: SearchResult[];
    error: Error | null;
}

export function useSearchResults(): SearchResultsHookResult;