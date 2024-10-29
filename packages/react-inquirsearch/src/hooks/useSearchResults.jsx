import { useEffect, useState } from 'react';
import { useSearchManager } from '../context/SearchProvider';
import { SearchResults } from '@inquir/inquirsearch';

export const useSearchResults = () => {
    const searchManager = useSearchManager();
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!searchManager) return;
        const searchResults = new SearchResults(searchManager);
        const unsubscribeResults = searchResults.on('resultsChange', (newResults) => {
            setError(null);
            setResults(newResults);
        });
        const unsubscribeLoading = searchManager.on('loading', setIsLoading)
        const unsubscribeError = searchManager.on('error', (err) => {
            setError(err);
        });
        return () => {
            if (unsubscribeResults) unsubscribeResults();
            if (unsubscribeError) unsubscribeError();
            if (unsubscribeLoading) unsubscribeLoading();
            searchResults.destroy();
        };
    }, [searchManager]);

    return { isLoading, results, error };
};
