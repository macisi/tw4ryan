import Koa from 'koa';
import session from 'koa-session';
import render from './server/middleware/render';
import auth from './server/middleware/auth';
import apiRouter from './server/api';

const app = new Koa();

const SESSION_CONFIG = {
  renew: true,
};

app.keys = ['grant']
app.use(session(SESSION_CONFIG, app));
app.use(auth);
app.use(async (ctx, next) => {
  if (!ctx.session.grant) {
    ctx.redirect('/connect/tumblr');
  } else {
    await next();
  }
});
app.use(apiRouter());
app.use(render());

app.listen(3000);