'use strict';

const Router = require('koa-router');
const request = require('co-request');

const apiRouter = new Router();

function *makeApiRequest(next){
	let params = this.params;
	let url = Object.keys(params).map( key => params[key]).join('/');
	if (this.session.grant) {
		let reqOption = {
			baseUrl	: 'https://api.twitter.com/1.1/',
			method	: this.method,
			uri		: url,
			json	: true,
			oauth	: {
				consumer_key: 'NhPm8eTgY1xraW85DpriU95mg',
				consumer_secret: 'dRkCShcW3bKni7RIQFIbtBmnyzHBWCgfxssXbQSKg1ku5761VW',
				token: this.session.grant.response.access_token,
				token_secret: this.session.grant.response.access_secret
			}
		};
		if (this.method.toLowerCase() === 'get' && this._parsedUrl.search) {
			reqOption.uri += this._parsedUrl.search;
		}
		let result = yield request(reqOption);
		this.body = result.body;
	} else {
		yield next;
	}
}

apiRouter.all('/:name/:action', function *(next){
	yield makeApiRequest.call(this, next);
});
apiRouter.all('/:name/:action/:id', function *(next){
	yield makeApiRequest.call(this, next);
});

module.exports = apiRouter;
