import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';

import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import Router from './Router';
import { loadState, saveState } from './localStorage';
import { throttle } from 'lodash';

import 'bootstrap/dist/css/bootstrap.min.css';

const persistedState = loadState();

const store = configureStore(persistedState);

store.subscribe(throttle(() => {
    saveState(store.getState())
}, 1000));

const app = (
    <Provider store={store}>
        <Router />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
