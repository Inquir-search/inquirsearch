export interface MessageInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

declare const MessageInput: React.FC<MessageInputProps>;
export default MessageInput;