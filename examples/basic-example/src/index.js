import { SearchManager, SearchBox, SearchResults, MessagesManager } from '@inquir/inquirsearch';
import { marked } from 'marked';

// create .env file in the root of the project and add the following:
// API_KEY
// INDEX_NAME
const apiKey = process.env.API_KEY;
const indexName = process.env.INDEX_NAME;

const searchManager = new SearchManager({ apiKey, indexName });

const searchBox = new SearchBox(searchManager);
const searchResults = new SearchResults(searchManager);

const inputElement = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const loadingIndicator = document.getElementById('loading-indicator');

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

const baseUrl = "http://localhost:8000";
const messagesManager = new MessagesManager({ baseUrl, apiKey });

const questionInputElement = document.getElementById('question-input');
const sendQuestionButton = document.getElementById('send-question');
const messagesContainer = document.getElementById('messages-container');

sendQuestionButton.addEventListener('click', async () => {
    const question = questionInputElement.value;
    if (question) {
        await messagesManager.sendMessage({
            indexName,
            "query": question
        });
        questionInputElement.value = '';
    }
});

messagesManager.on('update', (state) => {
    const messages = Array.from(state.messages.values());
    messagesContainer.innerHTML = '';
    messages.forEach((message) => {
        const messageItem = document.createElement('div');
        messageItem.className = `message-bubble ${message.sender}`;
        messageItem.innerHTML = marked(message.message); // Convert markdown to HTML
        messagesContainer.appendChild(messageItem);
    });

    // Show or hide the loading indicator based on the loading state
    if (state.loading) {
        loadingIndicator.style.display = 'block';
    } else {
        loadingIndicator.style.display = 'none';
    }
});

messagesManager.on('error', (error) => {
    console.error('MessagesManager encountered an error:', error);
    // Optionally, display the error to the user
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = `Error: ${error.message || error}`;
    messagesContainer.appendChild(errorElement);
});