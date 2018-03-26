import request from 'request-promise-native';
import config from '../../config';

const URL_PREFIX = '/api';

const middleware = () => {
  return async (ctx, next) => {
    if (ctx.path.startsWith(URL_PREFIX)) {
      try {
        const result = await request({
          method: ctx.method,
          baseUrl: 'https://api.tumblr.com/v2/',
          url: ctx.path.replace(URL_PREFIX, ''),
          json: true,
          oauth: {
            consumer_key: config.tumblr.key,
            consumer_secret: config.tumblr.secret,
            token: ctx.session.grant.request.oauth_token,
            token_secret: ctx.session.grant.request.oauth_token_secret,
          },
        });
        ctx.body = result.body;
      } catch (err) {
        ctx.body = err.error;
      }
    } else {
      await next();
    }
  };
}

export default middleware;