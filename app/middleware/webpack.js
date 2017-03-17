const webpackMiddleware = require('koa-webpack-dev-middleware');
const webpack = require('webpack');
const webpackConf = require('../../webpack.conf');

const compiler = webpack(webpackConf);

module.exports = function(options, app) {
  return webpackMiddleware(compiler, {
    publicPath: '/assets/',
  });
};


