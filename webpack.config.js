var path = require('path');

module.exports = {
    entry: __dirname + '/src/harbour/Harbour.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        filename: 'harbour.js',
        libraryTarget: "umd",
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
        }],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    }
};
