import { FC } from 'react';

export interface Message {
    message: string;
    sender: 'user' | 'bot';
}

export interface ChatContainerProps {
    apiKey: string;
    baseUrl?: string;
    indexName: string;
    onError?: (error: Error) => void;
    initialMessages?: Message[];
}

declare const ChatContainer: FC<ChatContainerProps>;

export { ChatContainer };
export default ChatContainer;