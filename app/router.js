'use strict';

module.exports = app => {
  // api
  app.get('/api/login', 'api.login');
  // pages
  app.get('/*', 'home.index');
};
