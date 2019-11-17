/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    background: './src/background.ts',
    popup: './src/popup.ts'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [new copyPlugin([{ from: 'public', to: './' }])]
};
