const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const makeEntry = (page) => {
  return [
    // 'react-hot-loader/patch',
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    `./src/pages/${page}/`,
  ];
};

const generateEntries = (entries) => {
  let pages = fs.readdirSync(path.resolve(__dirname, './src/pages'));
  pages.forEach(page => {
    try {
      const entry = path.join(__dirname, 'src', 'pages', page, 'index.js');
      if (fs.statSync(entry).isFile()) {
        entries[page] = makeEntry(page);
      }
    } catch (e) {}
  });
  return entries;
};

module.exports = {
  entry: generateEntries({
    app: [
      // 'react-hot-loader/patch',
      // 'webpack-dev-server/client?http://localhost:3000',
      // 'webpack/hot/only-dev-server',
      './src/app.js',
    ],
  }),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets/',
    filename: '[name].js',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            [ 'es2015', { modules: false }],
            'stage-0',
            'react',
          ],
          plugins: [
            'transform-async-to-generator',
            'transform-decorators-legacy',
          ],
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
  ],
};
