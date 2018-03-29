import { hydrate } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import App from '../shared/App';
import reducer from '../shared/reducer';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(reducer, preloadedState);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

// remove server side rendered style
const jssServerSideStyles = document.querySelectorAll('.jss-sheet');
for (const styleTag of jssServerSideStyles) {
  styleTag.parentElement.removeChild(styleTag);
}

export default hot(module)(App);