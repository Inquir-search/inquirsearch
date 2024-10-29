import './App.css';
import '@inquir/react-inquirsearch/dist/main.css';
import { SearchProvider, SearchBox, SearchResults, SearchModal } from '@inquir/react-inquirsearch';

function App() {
  return (
    <SearchProvider
      indexName="inquir-test-1730287128584"
      apiKey="9201f1f4-xxxxx-b5693f9178a2ffee3b"
      debounce={250}
      size={20}
    >
      <SearchModal />
    </SearchProvider>
  );
}

export default App;
