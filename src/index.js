import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from './components/Main';
import reducers from './reducers';

injectTapEventPlugin();

// Pull state from local browser store to stop accidental navigation destroying work.
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(
  reducers,
  persistedState,
  composeWithDevTools(
    applyMiddleware(thunk),
));

// Store state in local browser store to stop accidental navigation destroying work.
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});


const App = () => (
  <MuiThemeProvider>
    <Main />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.main-holder'));
