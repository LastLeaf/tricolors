var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: './src/game.js',
  output: {
    filename: 'game.js',
    library: 'game',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  target: 'web',
  module: {
    rules: [{
      test: /\.glsl$/,
      use: {
        loader: 'raw-loader'
      }
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env']
        }
      }
    }]
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     mangle: true
  //   })
  // ]
}
