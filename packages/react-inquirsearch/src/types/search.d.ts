export interface SearchError extends Error {
    code?: string;
    details?: unknown;
}

type SearchResult = {};

export interface SearchState {
    query: string;
    results: SearchResult[];
    isLoading: boolean;
    error: SearchError | null;
}