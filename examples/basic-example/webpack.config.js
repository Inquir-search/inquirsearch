const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack/hot/dev-server',
        './src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/',
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname),
        },
        compress: true,
        port: 9000,
        hot: true,
        open: true,
        historyApiFallback: true,
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
    resolve: {
        symlinks: true,
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '../../node_modules'),
        ],
        alias: {
            '@inquir/inquirsearch': path.resolve(__dirname, '../../packages/inquirsearch/dist/index.js'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Use a template from src
        }),
    ],
};
