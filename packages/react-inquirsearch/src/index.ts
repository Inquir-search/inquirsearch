// Context
export { SearchProvider } from './context/SearchProvider';
export type { SearchState, SearchContextValue, SearchProviderProps } from './context/SearchProvider';

// Components
export { default as SearchBox } from './components/SearchBox';
export { default as Bubble } from './components/Bubble';
export type { BubbleProps } from './components/Bubble';
export { default as SearchModal } from './components/SearchModal';
export { default as SearchResults } from './components/SearchResults';
export type { SearchResult } from './components/SearchResults';
export { default as ChatContainer } from './components/ChatContainer';
export type { ChatContainerProps } from './components/ChatContainer';
export { default as MessageList } from './components/MessageList';
export type { MessageListProps, Message } from './components/MessageList';
export { default as MessageInput } from './components/MessageInput';
export type { MessageInputProps } from './components/MessageInput';
export { default as RndContainer } from './components/RndContainer';
export type { RndContainerProps } from './components/RndContainer';

// Hooks
export { useSearchBox } from './hooks/useSearchBox';
export type { SearchBoxHookResult } from './hooks/useSearchBox';
export { useSearchResults } from './hooks/useSearchResults';
export type { SearchResultsHookResult } from './hooks/useSearchResults';

// Types
export type { SearchError, SearchState as GlobalSearchState } from './types/search';
