var path = require('path');

module.exports = {
    entry: __dirname + '/harbour.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        filename: 'harbour.js',
        library: "Harbour",
        libraryTarget: "umd",
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    },
    resolve: {
        extensions: ['.js', '.es6']
    }
};
