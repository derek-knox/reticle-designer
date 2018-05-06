import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
export default class NotFoundPage extends Component {

  render() {
    return (
      <div className="App container-fluid">

        <div className='row'>
          <h1 className="App-title">
            <span>Not Found Page</span>
          </h1>
          <hr />
        </div>

      </div>
    );
  }
}