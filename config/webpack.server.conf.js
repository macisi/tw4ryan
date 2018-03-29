const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const cwd = process.cwd();

module.exports = {
  context: path.join(cwd, './src'),
  entry: {
    app: './server/template/index',
  },
  output: {
    path: path.join(cwd, './src/server/build'),
    libraryTarget: 'commonjs2',
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
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
  },
  devtool: false,
  target: 'node',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
  ],
};