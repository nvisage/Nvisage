import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Router, useRouterHistory} from 'react-router';
import {syncHistory, routeReducer} from 'redux-simple-router';
import createHashHistory from 'history/lib/createHashHistory';

import AppComponent from './components/app/app.jsx';
import reducers from './components/app/appreducer.jsx';


const history = useRouterHistory(createHashHistory)({queryKey: false});

const reducer = combineReducers(Object.assign({}, ...reducers, {routing: routeReducer}));

const reduxRouterMiddleware = syncHistory(history, store);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {AppComponent.route}
    </Router>
  </Provider>,
  document.getElementById('app'));
