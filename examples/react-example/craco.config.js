const path = require('path');

module.exports = {
    webpack: {
        alias: {
            // Optionally add aliases for simpler imports
            '@inquir/inquirsearch': path.resolve(__dirname, '../../packages/inquirsearch/dist'),
            '@inquir/react-inquirsearch': path.resolve(__dirname, '../../packages/react-inquirsearch/dist'),
        },
    }
};
