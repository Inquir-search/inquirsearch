import { SearchManager, SearchBox, SearchResults, MessagesManager } from '@inquir/inquirsearch';
import { marked } from 'marked';

const apiKey = '';
const searchManager = new SearchManager({ apiKey, indexName: '' });

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

const messagesManager = new MessagesManager({ apiKey });

const questionInputElement = document.getElementById('question-input');
const sendQuestionButton = document.getElementById('send-question');
const messagesContainer = document.getElementById('messages-container');

sendQuestionButton.addEventListener('click', async () => {
    const question = questionInputElement.value;
    if (question) {
        await messagesManager.sendMessage({
            "indexName": "",
            "query": question
        });
        questionInputElement.value = '';
    }
});

messagesManager.messages.subscribe((messages) => {
    messagesContainer.innerHTML = '';
    messages.forEach((message) => {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-bubble';
        messageItem.innerHTML = marked(message.message); // Convert markdown to HTML
        messagesContainer.appendChild(messageItem);
    });
});