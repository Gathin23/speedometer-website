const Path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/scripts/index.js'),
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: Path.resolve(__dirname, '../public'), to: 'public' },
        // Netlify redirects must be in the published dir
        "./_redirects"
      ],
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'ethNode.html',
      template: Path.resolve(__dirname, '../src/ethNode.html'),
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
      jquery: "jquery/src/jquery",
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        type: 'asset'
      },
    ],
  },
};
