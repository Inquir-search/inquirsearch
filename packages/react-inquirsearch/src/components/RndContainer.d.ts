export interface RndContainerProps {
    children: React.ReactNode;
    defaultPosition?: { x: number; y: number };
    defaultSize?: { width: number; height: number };
    minWidth?: number;
    minHeight?: number;
    title?: string;
}

declare const RndContainer: React.FC<RndContainerProps>;
export default RndContainer;