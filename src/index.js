import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleWare from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './components/App.jsx';
import reducer from './reducer';
import { fetchUserData } from './action';

let store = createStore(
  reducer,
  applyMiddleware(thunkMiddleWare)
);

store.dispatch(fetchUserData());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
