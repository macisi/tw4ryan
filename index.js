'use strict';

const koa = require('koa');
const router = require('./server/router/router');
const mount = require('koa-mount');
const session = require('koa-generic-session');
const views = require('koa-views');
const Grant = require('grant-koa');
const serve = require('koa-static');
const logger = require('koa-logger');
const config = require('./server/config.json');
const webpack = require('webpack');
const webpackMiddleware = require("koa-webpack-dev-middleware");
let webpackConfig = require('./webpack.config');

const grant = new Grant(config);

const app = koa();

app.keys = ['grant'];
	
app
	.use(logger())
	.use(serve(__dirname + '/assets'))
	.use(views(__dirname + '/server/view', {
		default: 'jade'
	}))
	.use(session())
	.use(mount(grant));
	
router(app);

app.use(webpackMiddleware(webpack(webpackConfig), {
    publicPath: '/assets/',
	stats: {
        colors: true
    }
}));

app.listen(8082, function(){
	console.log('Koa server listening on port 8082');
});