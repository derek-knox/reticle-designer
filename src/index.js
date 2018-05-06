import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import registerServiceWorker from './utils/registerServiceWorker';

import { HistoryAdapter } from 'mobx-state-router';
import { history } from './state/utils/History';
import App from './App';

import Stores from './state/stores/Stores';

// State

const stores = new Stores();

// Routing/History

const historyAdapter = new HistoryAdapter(stores.routerStore, history);
historyAdapter.observeRouterStateChanges();

// UI

ReactDOM.render(
  <Provider stores={stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// Service Worker

registerServiceWorker();