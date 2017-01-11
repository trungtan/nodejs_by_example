/**
 * Created by tan.bui on 4.1.2017.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './assets/js/main.js',               // main js file
    output: {
        path: path.resolve(__dirname, 'js'),    // built file
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};