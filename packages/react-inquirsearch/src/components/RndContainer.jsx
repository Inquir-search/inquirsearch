import React from 'react';
import { Rnd } from 'react-rnd';
import * as styles from './RndContainer.module.css';

const RndContainer = ({
    children,
    defaultPosition = { x: 0, y: 0 },
    defaultSize = { width: 320, height: 320 },
    minWidth = 200,
    minHeight = 200,
    title = 'Window'
}) => {
    return (
        <Rnd
            default={{
                ...defaultPosition,
                ...defaultSize,
            }}
            minWidth={minWidth}
            minHeight={minHeight}
            dragHandleClassName={styles.header}
            bounds="window"
            className={styles.container}
        >
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <span className={styles.title}>{title}</span>
                </div>
                <div className={styles.content}>
                    {children}
                </div>

            </div>
        </Rnd>
    );
};

export default RndContainer;