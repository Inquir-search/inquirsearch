const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development', // Switch to 'production' when deploying for production
    devtool: 'eval-source-map', // Use 'source-map' for production
    entry: './src/index.js', // Main entry point for your application
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'ReactInquirSearch',
        libraryTarget: 'umd',
        globalObject: 'this',
        clean: true, // Automatically clean the output directory before each build
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.module\.css$/i, // Rules for CSS modules
                use: [
                    MiniCssExtractPlugin.loader, // Extracts CSS into separate files
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]', // Scoped CSS names
                                exportLocalsConvention: "camelCase", // Export classes in camelCase
                            }
                        }
                    },
                ]
            },
            {
                test: /\.css$/i,
                exclude: /\.module\.css$/i, // Exclude CSS modules
                use: [
                    MiniCssExtractPlugin.loader, // Also extract regular CSS into separate files
                    'css-loader' // To process CSS files
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css' // Defines the name of the CSS files the plugin extracts
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@inquir/inquirsearch': path.resolve(__dirname, '../inquirsearch/dist/index.js') // Alias for imports
        }
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React', // Ensures compatibility with different module systems
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM',
        },
    },
};
