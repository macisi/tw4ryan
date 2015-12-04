'strong mode';

const koa = require('koa');
const router = require('koa-router')();
const mount = require('koa-mount');
const session = require('koa-session');
const views = require('koa-views');
const Grant = require('grant-koa');
const serve = require('koa-static');

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
		yield this.render('index');
	})
	.get('/callback', function *(next){
		this.body = JSON.stringify(this.query);
	});
	
app
	.use(serve(__dirname + '/assets'))
	.use(views(__dirname + '/view', {
		default: 'jade'
	}))
	.use(session(app))
	.use(mount(grant))
	.use(router.routes());

app.listen(8082, function(){
	console.log('Koa server listening on port 8082');
});