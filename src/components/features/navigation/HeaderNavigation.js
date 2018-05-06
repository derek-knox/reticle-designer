import React, { Component } from 'react';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import { RouterState } from 'mobx-state-router';

@inject('stores')
@observer
export default class HeaderNavigation extends Component {

  // Handlers

  @action.bound onGoHome() {
    this.props.stores.routerStore.goTo(new RouterState('home'));
  }

  @action.bound onGoOther() {
    this.props.stores.routerStore.goTo(new RouterState('other'));
  }

  // UI

  render() {
    return (
      <div className='container-fluid'>
        <div class='row'>
          <div class='col-md-12'>
            <button class='btn btn-primary' onClick={this.onGoHome}>Home</button>
            <button class='btn btn-primary' onClick={this.onGoOther}>Other</button>
          </div>
        </div>
      </div>
    );
  }
  
}