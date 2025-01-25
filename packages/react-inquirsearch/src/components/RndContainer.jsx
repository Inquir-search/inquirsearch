import React from 'react';
import { Rnd } from 'react-rnd';
import PropTypes from 'prop-types';
import * as styles from './RndContainer.module.css';

export default function RndContainer({
    title,
    children,
    defaultPosition = { x: 0, y: 0 },
    defaultSize = { width: 320, height: 320 },
    minWidth = 300,
    minHeight = 200,
    header,  // Add header prop
    isVisible = true  // Add new prop
}) {
    const defaultHeader = (
        <div style={{ 
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            width: '100%',
            justifyContent: 'space-between',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e9ecef',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            cursor: 'move'
        }}>
            <span style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#2c3e50',
                userSelect: 'none'
            }}>{title}</span>
        </div>
    );

    return (
        <Rnd
            default={{
                ...defaultPosition,
                ...defaultSize,
            }}
            style={{ display: isVisible ? 'block' : 'none' }}
            minWidth={minWidth}
            minHeight={minHeight}
            dragHandleClassName={styles.header}
            bounds="window"
            className={styles.container}
        >
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    {header || defaultHeader}
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </Rnd>
    );
};

RndContainer.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    defaultPosition: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    defaultSize: PropTypes.shape({
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }),
    minWidth: PropTypes.number,
    minHeight: PropTypes.number,
    header: PropTypes.node,
    isVisible: PropTypes.bool  // Add new prop type
};