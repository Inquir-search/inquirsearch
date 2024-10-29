import { useEffect, useState } from 'react';
import { useSearchManager } from '../context/SearchProvider';
import { SearchResults } from '@inquir/inquirsearch';

export const useSearchResults = () => {
    const searchManager = useSearchManager();
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const searchResults = new SearchResults(searchManager);
        const unsubscribeResults = searchResults.subscribe((newResults) => {
            setError(null);
            setResults(newResults);
        });
        const unsubscribeError = searchManager.subscribe('error', (err) => {
            setError(err);
        });
        return () => {
            unsubscribeResults();
            unsubscribeError();
            searchResults.destroy(); // Destroy the searchResults instance
        };
    }, [searchManager]);

    return { results, error };
};
