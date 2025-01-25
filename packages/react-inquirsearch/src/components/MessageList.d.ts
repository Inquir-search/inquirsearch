export interface Message {
    message: string;
    sender: 'user' | 'bot';
}

export interface MessageListProps {
    messages: Message[];
    isLoading: boolean;
    renderMessage: (message: string) => { __html: string };
}

declare const MessageList: React.FC<MessageListProps>;
export default MessageList;