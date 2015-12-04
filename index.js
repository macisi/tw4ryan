'strong mode';

const koa = require('koa');
const router = require('koa-router')();
const mount = require('koa-mount');
const session = require('koa-session');
const Grant = require('grant-koa');

const grant = new Grant({
	server: {
		protocol: 'http',
		host: 'tw4ryan.com'
	},
	twitter: {
		key: 'NhPm8eTgY1xraW85DpriU95mg',
		secret: 'dRkCShcW3bKni7RIQFIbtBmnyzHBWCgfxssXbQSKg1ku5761VW',
		callback: '/callback'
	}
});

const app = koa();

app.keys = ['grant'];

router
	.get('/', function *(next){
		this.body = 'hello buddy!';
	})
	.get('/callback', function *(next){
	this.body = JSON.stringify(this.query);
});

app
	.use(session(app))
	.use(mount(grant))
	.use(router.routes())

app.listen(8082, function(){
	console.log('Koa server listening on port 8082');
});