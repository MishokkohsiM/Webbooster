const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sourcePath = path.join(__dirname, '../src/');
const nodeExternals = require('webpack-node-externals');
const extractCSS = new ExtractTextPlugin('styles.min.css');

module.exports = {
  entry: {
    main: [
      './src/index.js',
    ]
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(react-native)/,
        use: [
          "babel-loader",
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            'sass-loader',
            'postcss-loader',
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {extensions: ['*', '.js', '.jsx', '.tsx', '.ts']},
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'bundle.js'
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "src"),
    port: 3000,
    disableHostCheck: true,
    hotOnly: true,
    historyApiFallback: true,
  },
};
