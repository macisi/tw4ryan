import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import ReactJSS from 'react-jss';
import Redux from 'redux';
import { getTemplate } from '../utils/index';
import reducer from '../../shared/reducer';

const { createStore } = Redux;

const ROOT_PATH = process.cwd();
const templatePath = path.join(ROOT_PATH, './src/server/build/app.js');

export default () => {
  return async (ctx, next) => {
    const { req } = ctx;
    const context = {};
    const sheets = new ReactJSS.SheetsRegistry();
    const generateClassName = ReactJSS.createGenerateClassName();
    const store = createStore(reducer);

    const template = getTemplate(templatePath, ctx)(req, {
      sheets,
      generateClassName,
      store,
    }, context);
    
    const markup = ReactDOMServer.renderToString(template);
  
    if (context.url) {
      ctx.status = 302;
      ctx.redirect(context.url);
    } else {
      const webpackStates = ctx.state.webpackStats.toJson();
      const { assetsByChunkName, publicPath } = webpackStates;
      const assetsList = Object.keys(assetsByChunkName).map(name => assetsByChunkName[name]);

      const stylesheets = assetsList.reduce((prev, group) => {
        return prev.concat(
          group.filter(name => name.endsWith('.css'))
            .map(path => publicPath + path)
        );
      }, []);
      const scripts = assetsList.reduce((prev, group) => {
        return prev.concat(
          group.filter(name => name.endsWith('.js'))
            .map(path => [publicPath, path].join('/'))
        );
      }, []);

      const preloadedState = store.getState();

      ctx.body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Tw4ryan</title>
          <style class="jss-sheet">
            ${sheets.toString()}
          </style>
          <script src="https://cdn.bootcss.com/react/16.2.0/umd/react.development.js"></script>
          <script src="https://cdn.bootcss.com/react-dom/16.2.0/umd/react-dom.development.js"></script>
        </head>
        <body>
          <div id="app">${markup}</div>
          <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>  
          ${scripts.map(script => `<script src="${script}"></script`).join('\n')}
        </body>
        </html>
      `;
    }
  
  }
};