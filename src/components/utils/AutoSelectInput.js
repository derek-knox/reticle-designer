import React, { Component } from 'react';

export default class AutoSelectInput extends Component {

  select(e) {
    e.target.select();
  }

  // UI

  render() {
    return (
      <input
        {...this.props}
        onFocus={this.select}
      />
      
    )
  }
}