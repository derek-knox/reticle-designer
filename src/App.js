import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouterView } from 'mobx-state-router';
import DevTools from 'mobx-react-devtools';

import HeaderNavigation from './components/features/navigation/HeaderNavigation';

import HomePage from './components/pages/HomePage';
import OtherPage from './components/pages/OtherPage';
import NotFoundPage from './components/pages/NotFoundPage';

import lessStyles from './App.less';

// UI

@inject('stores')
@observer
export default class App extends Component {

  render() {
    
    const viewMap = {
        home: <HomePage />,
        other: <OtherPage />,
        notFound: <NotFoundPage />
    };

    return (
      <div>
        <HeaderNavigation />
        <RouterView routerStore={this.props.stores.routerStore} viewMap={viewMap} />
        <DevTools />
      </div>
    );

  }
}