import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../../shared/App';

export default () => {
  return async (ctx, next) => {
    const { req } = ctx;
    const context = {};
  
    const instance = (
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App />
      </StaticRouter>
    );
  
    const markup = renderToString(instance);
  
    if (context.url) {
      ctx.status = 302;
      ctx.redirect(context.url);
    } else {
      ctx.body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Tw4ryan</title>
        </head>
        <body>
          <div id="app">${markup}</div>
        </body>
        </html>
      `;
    }
  
  }
};