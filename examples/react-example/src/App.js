import './App.css';
import '@inquir/react-inquirsearch/dist/main.css';
import { SearchProvider, SearchModal, ChatContainer } from '@inquir/react-inquirsearch';

const API_KEY = ""
const INDEX_NAME = ""

function App() {
  return (
    <div className="app">
      <SearchProvider
        indexName={INDEX_NAME}
        apiKey={API_KEY}
        debounce={250}
        size={20}
      >
        <div className="chat-container">
          <ChatContainer
            baseUrl="http://localhost:8000"
            apiKey={API_KEY}
            indexName={INDEX_NAME}
            onError={(error) => console.error('Chat error:', error)}
          />
        </div>
        {/* <SearchModal /> */}
      </SearchProvider>
    </div>
  );
}

export default App;
