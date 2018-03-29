import { StaticRouter } from 'react-router';
import { JssProvider } from 'react-jss';
import { Provider } from 'react-redux';
import App from '../../shared/App';

export default (req, { sheets, store, generateClassName }, context) => {

  return (
    <StaticRouter
      location={req.url}
      context={context}
    >
      <Provider store={store}>
        <JssProvider
        generateClassName={generateClassName}
        registry={sheets}
        >
          <App />
        </JssProvider>
      </Provider>
    </StaticRouter>
  );
};