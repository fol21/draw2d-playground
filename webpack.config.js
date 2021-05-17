const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry:
    [
      './app/scripts/main.js',
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'webpack/scripts'),
    },
    optimization: {
        minimize: false
      },
    plugins: [
      new webpack.ProvidePlugin({
        "$":"jquery",
        "jQuery":"jquery",
        "window.jQuery":"jquery"  
      }),
    ],
    devtool: 'source-map',
};