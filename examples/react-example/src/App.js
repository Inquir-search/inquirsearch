import './App.css';
import '@inquir/react-inquirsearch/dist/main.css';
import { SearchProvider, ChatContainer, RndContainer, SearchModal } from '@inquir/react-inquirsearch';
import React, { useState } from 'react';

const API_KEY = "ab787d1c-xxxxx-d7958ee0a814eeccb0"
const INDEX_NAME = "inquir-test-2-1737730742118"

const RND_WIDTH = 400;
const RND_HEIGHT = 600;

const getDefaultPosition = () => {
  const padding = 20;
  return {
    x: (typeof window !== 'undefined' ? window.innerWidth : 800) - RND_WIDTH - padding,
    y: (typeof window !== 'undefined' ? window.innerHeight : 600) - RND_HEIGHT - padding
  };
};

function App() {
  const [isVisible, setIsVisible] = useState(true);

  const customHeader = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      boxSizing: 'border-box',
      width: '100%',
      justifyContent: 'space-between',
      backgroundColor: '#f8f9fa',
      cursor: 'move'
    }}>
      <span style={{
        fontSize: '16px',
        fontWeight: 600,
        color: '#2c3e50'
      }}>Chat</span>
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          padding: '4px 8px',
          color: '#2c3e50'
        }}
      >
        {isVisible ? '−' : '+'}
      </button>
    </div>
  );

  return (
    <div className="App">
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 1000
          }}
        >
          Open Chat
        </button>
      )}

      <SearchProvider
        indexName={INDEX_NAME}
        apiKey={API_KEY}
        debounce={250}
        size={20}
      >
        <RndContainer
          title="Chat"
          header={customHeader}
          isVisible={isVisible}
          defaultPosition={getDefaultPosition()}
          defaultSize={{ width: RND_WIDTH, height: RND_HEIGHT }}
          minWidth={300}
          minHeight={400}
        >
          <ChatContainer
            initialMessages={
              [
                { message: "Hello", sender: "bot" }
              ]
            }
            baseUrl="http://localhost:8000"
            apiKey={API_KEY}
            indexName={INDEX_NAME}
            onError={(error) => console.error('Chat error:', error)}
          />
        </RndContainer>
        <SearchModal />
      </SearchProvider>
    </div>
  );
}

export default App;
