import './App.css';
import '@inquir/react-inquirsearch/dist/main.css';
import { SearchProvider, SearchBox, SearchResults, SearchModal } from '@inquir/react-inquirsearch';

function App() {
  return (
    <SearchProvider indexName="rnm2-1718548774993" apiKey="9201f1f4-xxxxx-b5693f9178a2ffee3b">
      <SearchModal />
    </SearchProvider>
  );
}

export default App;
