'use strict';
const Router = require('koa-router');
const apiRouter = require('./api');

module.exports = function(app){
	const router = Router();
	
	router
		.get('/', function *(next){	
			if (this.session.grant) {
				return yield this.render('page/index');
			}
			this.redirect('/connect/twitter');
		})
		.get('/user/:user_id', function *(next){
			if (this.session.grant) {
				return yield this.render('page/user', this.params);
			}
			this.redirect('/connect/twitter');
		})
		.get('/handle_facebook_callback', function *(next){
			this.redirect('/');
		});
	
	router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());
		
	app.use(router.routes());
};