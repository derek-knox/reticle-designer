import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import registerServiceWorker from './utils/registerServiceWorker';

import { MuiThemeProvider } from 'material-ui/styles';

import { HistoryAdapter } from 'mobx-state-router';
import { history } from './state/utils/History';
import App from './App';

import Theme from './utils/theme';
import Stores from './state/stores/Stores';

// State

const stores = new Stores();

// Routing/History

const historyAdapter = new HistoryAdapter(stores.routerStore, history);
historyAdapter.observeRouterStateChanges();

// UI

const theme = Theme();

ReactDOM.render(
  <Provider stores={stores}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// Service Worker

registerServiceWorker();