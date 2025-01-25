export interface SearchBoxHookResult {
    query: string;
    updateQuery: (newQuery: string) => void;
}

export function useSearchBox(): SearchBoxHookResult;