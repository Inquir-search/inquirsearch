import { defaults } from 'jest-config';

export default {
    ...defaults,
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    testEnvironment: 'node',
};