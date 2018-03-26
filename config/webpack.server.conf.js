const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    index: './index',
  },
  output: {
    path: path.resolve(__dirname, '../build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            babelrc: false,
          },
        },
      },
    ],
  },
  externals: [ nodeExternals() ],
  devtool: 'eval-source-map',
  target: 'node',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
  ],
};