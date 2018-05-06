import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouterView } from 'mobx-state-router';
import DevTools from 'mobx-react-devtools';

import HomePage from './components/pages/HomePage';
import OtherPage from './components/pages/OtherPage';
import NotFoundPage from './components/pages/NotFoundPage';

import lessStyles from './App.less';

import Button from 'material-ui/Button';


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
        <Button variant="raised" color="primary">Hello World</Button>
        <RouterView routerStore={this.props.stores.routerStore} viewMap={viewMap} />
        <DevTools />
      </div>
    );

  }
}