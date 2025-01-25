import { CSSProperties } from 'react';

export interface BubbleProps {
    message: string;
    sender: 'user' | 'bot';
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string;
    style?: CSSProperties;
    className?: string;
    timestamp?: Date;
    status?: 'sent' | 'delivered' | 'read';
}

declare const Bubble: React.FC<BubbleProps>;
export default Bubble;