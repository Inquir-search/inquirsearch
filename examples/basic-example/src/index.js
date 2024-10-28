import { SearchManager, SearchBox, SearchResults } from '@inquir/inquirsearch';

const apiKey = '9201f1f4-xxxxx-b5693f9178a2ffee3b';
const searchManager = new SearchManager({ apiKey, indexName: 'rnm2-1718548774993' });

const searchBox = new SearchBox(searchManager);
const searchResults = new SearchResults(searchManager);

const inputElement = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

inputElement.addEventListener('input', (event) => {
    const query = event.target.value;
    searchBox.setQuery(query);
    searchManager.executeSearch();
});

searchBox.subscribe((newQuery) => {
    console.log('Query updated:', newQuery);
});

searchResults.subscribe((newResults) => {
    resultsContainer.innerHTML = '';
    newResults.forEach((item) => {
        const resultItem = document.createElement('div');
        resultItem.textContent = item.title;
        resultsContainer.appendChild(resultItem);
    });
});

searchManager.subscribe('error', (error) => {
    console.error('Search encountered an error:', error);
});