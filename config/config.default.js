'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = {
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.nj': 'nunjucks',
      },
    },
    middleware: [ 'webpack' ],
    // static file config
    static: {
      dir: path.join(appInfo.baseDir, 'node_modules'),
    },
    // should change to your own
    keys: appInfo.name + '_1489565112905_1304',
  };

  return config;
};
