import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
export default class HomePage extends Component {
  
  render() {
    return (
      <div className="App container-fluid">

        <div className='row'>
          <h1 className="App-title">
            <span>Home Page</span>
          </h1>
          <hr />
          {this.props.stores.exampleStore.items.length}
        </div>

      </div>
    );
  }
  
}