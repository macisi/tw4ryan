import webpack from 'webpack';
import middleware from 'koa-webpack';
import MemoryFS from 'memory-fs';

import getWebpackClientConfig from '../../../config/webpack.client.conf';
import webpackServerConfig from '../../../config/webpack.server.conf';
const webpackClientConfig = getWebpackClientConfig({
  dev: true,
});

const clientWebpackCompiler = webpack(webpackClientConfig);
const serverWebpackCompiler = webpack(Object.assign(
  webpackServerConfig,
  {
    mode: 'development',
  },
));

const serverCompiler = () => {
  // use memory-fs as ouput fileSystem
  const mfs = new MemoryFS();
  serverWebpackCompiler.outputFileSystem = mfs;
  serverWebpackCompiler.watch({}, (err, stats) => {
    if (err) {
      console.warn(err);
    } else {
      console.log(
        stats.toString({
          colors: true,
        })
      );
    }
  });
  
  return (ctx, next) => {
    ctx.mfs = mfs;
    next();
  };
};

const clientCompiler = () => {
  return middleware({
    compiler: clientWebpackCompiler,
    hot: true,
    dev: {
      publicPath: '/assets',
      serverSideRender: true,
    },
  });
};

export { serverCompiler, clientCompiler };