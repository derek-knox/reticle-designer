import React, { Component } from 'react';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
export default class OtherPage extends Component {

  render() {
    return (
      <div className="App container-fluid">

        <div className='row'>
          <h1 className="App-title">
            <span>Other Page</span>
          </h1>
          <hr/>
        </div>

      </div>
    );
  }
  
}