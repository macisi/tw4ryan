'use strict';
const Router = require('koa-router');
const apiRouter = require('./api');

module.exports = function(app){
	const router = Router();
	
	router
		.get('/', function *(next){
			yield this.render('index');
		})
		.get('/handle_facebook_callback', function *(next){
			console.log(this.session.grant.response);
			this.body = JSON.stringify(this.session.grant.response, null, 2);
		});
	
	router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());
		
	app.use(router.routes());
};