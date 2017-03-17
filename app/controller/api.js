'use strict';

exports.login = app => {
  class ApiController extends app.Controller {
    * login() {
      const { ctx, service } = this;
      ctx.body = 'xxx';
    }
  }
  return ApiController;
};


