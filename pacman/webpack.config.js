const path = require('path');
const webpack           = require('webpack');
const prod              = process.env.NODE_ENV === 'production';
const isDevelopment     = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'bundle.js',
        publicPath:'/dist/',
        libraryTarget: "var",
        library: "app"
    },
    cache: isDevelopment,
    debug: isDevelopment,
    devServer: { inline: true },
    stats: {
        cached: false,
        cachedAssets: false,
        chunkModules: false,
        chunks: false,
        colors: true,
        errorDetails: true,
        hash: false,
        progress: true,
        reasons: false,
        timings: true,
        version: false
    },
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
    },
    plugins: prod ? [
    new webpack.optimize.DedupePlugin(),//去重
    new webpack.optimize.OccurenceOrderPlugin(),//分配最小id
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      }
    }),
  ] : [new webpack.optimize.OccurenceOrderPlugin()]
}
