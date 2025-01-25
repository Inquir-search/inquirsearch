# Inquir React Search Library

React components for integrating search and chat functionality with the Inquir platform.

## Installation

```bash
npm install @inquir/react-inquirsearch
```

## Key Components

| Component      | Description                               |
| :------------- | :---------------------------------------- |
| SearchProvider | Context provider for search functionality |
| ChatContainer  | Chat interface with message history       |
| RndContainer   | Draggable/resizable container             |
| SearchModal    | Search dialog (Cmd/Ctrl + K)              |

## Basic Usage
Add default styles to your project:

```javascript
import '@inquir/react-inquirsearch/dist/main.css';
```

```javascript
import { SearchProvider, SearchModal, ChatContainer, RndContainer } from '@inquir/react-inquirsearch';
import '@inquir/react-inquirsearch/dist/main.css';

function App() {
  return (
    <SearchProvider
      indexName="your-index"
      apiKey="your-api-key"
      baseUrl="http://localhost:8000"
    >
      {/* Chat Window */}
      <RndContainer
        defaultPosition={{ x: window.innerWidth - 420, y: 100 }}
        defaultSize={{ width: 400, height: 600 }}
      >
        <ChatContainer 
          indexName="your-index"
          initialMessages={[{ message: "Hello!", sender: "bot" }]}
        />
      </RndContainer>

      {/* Search Modal (Cmd/Ctrl + K) */}
      <SearchModal />
    </SearchProvider>
  );
}

export default App;
```

## Component API

### SearchProvider Props

| Prop      | Type   | Required | Description            |
| :-------- | :----- | :------: | :--------------------- |
| indexName | string |    ✓     | Search index name      |
| apiKey    | string |    ✓     | API authentication key |
| baseUrl   | string |    ✓     | API base URL           |
| debounce  | number |          | Debounce time (ms)     |
| size      | number |          | Results per page       |

### ChatContainer Props

| Prop            | Type     | Required | Description       |
| :-------------- | :------- | :------: | :---------------- |
| indexName       | string   |    ✓     | Index name        |
| onError         | function |          | Error handler     |
| initialMessages | array    |          | Starting messages |

### RndContainer Props

| Prop            | Type    | Required | Description        |
| :-------------- | :------ | :------: | :----------------- |
| defaultPosition | object  |          | Initial {x,y}      |
| defaultSize     | object  |          | Initial dimensions |
| minWidth        | number  |          | Min width (px)     |
| minHeight       | number  |          | Min height (px)    |
| title           | string  |          | Window title       |
| header          | element |          | Custom header      |
| isVisible       | boolean |          | Show/hide          |

### SearchModal Props

Keyboard shortcut: `Cmd/Ctrl + K`
No additional props required.

## License

MIT License