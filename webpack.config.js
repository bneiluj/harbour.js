module.exports = {
    entry: __dirname + '/lib/harbour.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        filename: 'harbour.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    },
    resolve: {
        alias: { 
            ContractAdapter: './web3/ContractAdapter.js'
        },
        extensions: ['.js', '.es6']
    }
};
