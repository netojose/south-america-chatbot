const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const APP_PATH = path.resolve(__dirname, 'src');

module.exports = {
  entry: APP_PATH,

  output: {
    filename: '[contenthash].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new Dotenv({ systemvars: true }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(APP_PATH, 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
  },

  devtool: 'source-map',

  performance: {
    hints: false,
  },
};
