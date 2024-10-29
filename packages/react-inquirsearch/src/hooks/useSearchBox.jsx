import { useEffect, useState } from 'react';
import { useSearchManager } from '../context/SearchProvider';

export const useSearchBox = () => {
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

    const updateQuery = (newQuery) => {
        searchManager.updateQuery(newQuery);
        searchManager.executeSearch();
    };

    return { query, updateQuery };
};
