const path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'HeadlessSearch',
        libraryTarget: 'umd',
        globalObject: 'this',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};
