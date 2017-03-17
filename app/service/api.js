const tumblr = require('tumblr.js');

module.exports = app => {
  class ApiService extends app.Service {
    * login() {
      const client = yield tumblr.createClient({
        credentials: {
          consumer_key: 'eoYwj4pYMaQkjNQBqAOzPP85IFjxxtEOikk8Y8rYVQqQ6KkQ6b',
          consumer_secret: 'T0FV2gEpj1xO3rYt6FFfCSViT44nINydPwhGsrtqr24QAb3FZy',
          token: '<oauth token>',
          token_secret: '<oauth token secret>',
        },
        returnPromises: true,
      });
      return client;
    }
  }
  return ApiService;
};
