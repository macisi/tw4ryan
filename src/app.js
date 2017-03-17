import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import reducer from './reducer';

import Home from './pages/home/';
import Login from './pages/login/';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    reducer,
    router: routerReducer,
  }),
  applyMiddleware(middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('App')
);