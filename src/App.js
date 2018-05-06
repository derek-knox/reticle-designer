import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouterView } from 'mobx-state-router';
import DevTools from 'mobx-react-devtools';

import ReticleDesignerPage from './components/pages/ReticleDesignerPage';
import NotFoundPage from './components/pages/NotFoundPage';

import lessStyles from './App.less';

// UI

@inject('stores')
@observer
export default class App extends Component {

  render() {
    
    const viewMap = {
        reticleDesignerPage: <ReticleDesignerPage />,
        notFound: <NotFoundPage />
    };

    return (
      <div className='app'>
        <RouterView routerStore={this.props.stores.routerStore} viewMap={viewMap} />
        <DevTools />
      </div>
    );

  }
}