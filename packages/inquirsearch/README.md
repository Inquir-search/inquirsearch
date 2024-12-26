# Inquir Search Library

A framework-agnostic JavaScript library for building search interfaces with real-time messaging capabilities.

## Installation

```bash
npm install @inquir/inquirsearch
```

## Basic Usage

```javascript
import { SearchManager, SearchBox, SearchResults, MessagesManager } from '@inquir/inquirsearch';

// Initialize components
const searchManager = new SearchManager({ 
  apiKey: process.env.API_KEY,
  indexName: process.env.INDEX_NAME 
});

const searchBox = new SearchBox(searchManager);
const searchResults = new SearchResults(searchManager);
const messagesManager = new MessagesManager({
  baseUrl: "http://localhost:8000",
  apiKey: process.env.API_KEY
});

// Handle search
searchBox.subscribe(query => {
  console.log('Query updated:', query);
});

searchResults.subscribe(results => {
  console.log('New results:', results);
});

// Handle messages
messagesManager.on('update', state => {
  const messages = Array.from(state.messages.values());
  console.log('Messages updated:', messages);
});

// Error handling
searchManager.subscribe('error', error => {
  console.error('Search error:', error);
});
```

## Features

- 🔍 Framework-agnostic search components
- ⚡ Real-time updates via SSE
- 🔒 Secure API authentication
- 📝 Markdown message support
- ⏱️ Built-in debouncing

## Core Components

### SearchManager
- Handles API communication
- Manages search state
- Emits search events

### SearchBox
- Manages search input
- Debounces queries
- Updates search state

### SearchResults
- Subscribes to search updates
- Maintains results state

### MessagesManager
- Handles real-time messaging
- Supports markdown formatting
- Manages message history

## Complete Example

```javascript
import { SearchManager, SearchBox, SearchResults, MessagesManager } from '@inquir/inquirsearch';

// Initialize components
const searchManager = new SearchManager({ 
  apiKey: process.env.API_KEY,
  indexName: process.env.INDEX_NAME 
});

const searchBox = new SearchBox(searchManager);
const searchResults = new SearchResults(searchManager);
const messagesManager = new MessagesManager({
  baseUrl: "http://localhost:8000",
  apiKey: process.env.API_KEY
});

// Handle search
searchBox.subscribe(query => {
  console.log('Query updated:', query);
});

searchResults.subscribe(results => {
  console.log('New results:', results);
});

// Handle messages
messagesManager.on('update', state => {
  const messages = Array.from(state.messages.values());
  console.log('Messages updated:', messages);
});

// Error handling
searchManager.subscribe('error', error => {
  console.error('Search error:', error);
});
```

## API Reference
### SearchManager

```typescript
interface SearchManagerConfig {
  apiKey: string;
  indexName: string;
}

new SearchManager(config: SearchManagerConfig)
```

### SearchBox

```typescript
new SearchBox(searchManager: SearchManager)
```

Methods:
- setQuery(query: string): void
- subscribe(callback: (query: string) => void): void
- getQuery(): string

### SearchResults
### MessagesManager
## Contributing
- Fork the repository
- Create a feature branch (git checkout -b feature/amazing-feature)
- Commit changes (git commit -m 'Add amazing feature')
- Push to branch (git push origin feature/amazing-feature)
- Open a Pull Request
## License
MIT License