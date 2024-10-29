import React from 'react';
import { useSearchResults } from '../hooks/useSearchResults';

const SearchResults = () => {
    const { results = [], error } = useSearchResults();
    console.log({ results, error })
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (results.length === 0) {
        return <div>No results found</div>;
    }

    return (
        <div>
            {results.map((result, index) => (
                <div key={index}>{result.title}</div> // Customize based on your result structure
            ))}
        </div>
    );
};

export default SearchResults;
