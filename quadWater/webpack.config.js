var path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'bundle.js',
        publicPath:'/dist/'
    },
    devServer: { inline: true },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel",
            query:{
                presets:['es2015']
            }
        },
        { test: /\.jpg$/, loader: "file-loader?name=[name].[ext]" },
        ]
    }
}
