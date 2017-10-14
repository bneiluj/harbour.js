var path = require('path');

module.exports = {
    entry: __dirname + '/harbour.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        filename: 'harbour.js',
        library: "Harbour",
        libraryTarget: "var",
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
