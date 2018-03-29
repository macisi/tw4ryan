const path = require('path');
const webpack = require('webpack');

module.exports = env => {

  const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom',
    }),
  ];

  let devtool;

  if (env.prod) {
    plugins.push(
      new webpack.HashedModuleIdsPlugin()
    );
    devtool = 'source-map';
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    );
    devtool = 'cheap-module-source-map';
  }

  const cwd = process.cwd();

  const ret = {
    context: path.join(cwd, './src'),
    entry: {
      index: ['./client/index'],
    },
    output: {
      path: path.join(cwd, './dist'),
      publicPath: '/assets',
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: ['defaults'],
                    modules: false,
                  },
                }],
                '@babel/preset-react',
              ],
              babelrc: false,
              plugins: [
                'react-hot-loader/babel',
              ],
            },
          },
        },
      ],
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
    plugins,
    devtool,
  };
  
  Object.assign(ret, {
    mode: env.dev ? 'development' : 'production',
  });

  return ret;
};