import './App.css';
import '@inquir/react-inquirsearch/dist/main.css';
import { SearchProvider, ChatContainer, RndContainer } from '@inquir/react-inquirsearch';

const API_KEY = ""
const INDEX_NAME = ""

const RND_WIDTH = 400;  // Default RndContainer width
const RND_HEIGHT = 600; // Default RndContainer height

const getDefaultPosition = () => {
  const padding = 20;
  return {
    x: (typeof window !== 'undefined' ? window.innerWidth : 800) - RND_WIDTH - padding,
    y: (typeof window !== 'undefined' ? window.innerHeight : 600) - RND_HEIGHT - padding
  };
};

function App() {
  return (
    <div className="app">
      <SearchProvider
        indexName={INDEX_NAME}
        apiKey={API_KEY}
        debounce={250}
        size={20}
      >
        <RndContainer
          title="Chat"
          defaultPosition={getDefaultPosition()}
          defaultSize={{ width: RND_WIDTH, height: RND_HEIGHT }}
          minWidth={300}
          minHeight={400}
        >
          <ChatContainer
            baseUrl="http://localhost:8000"
            apiKey={API_KEY}
            indexName={INDEX_NAME}
            onError={(error) => console.error('Chat error:', error)}
          />
        </RndContainer>
        {/* <SearchModal /> */}
      </SearchProvider>
    </div>
  );
}

export default App;
