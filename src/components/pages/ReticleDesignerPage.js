import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Reticles from '../features/Reticles';

@inject('stores')
@observer
export default class ReticleDesignerPage extends Component {
  
  render() {
    return (
      <div>
        
        <div className="header-container">
          <h1>Reticle Designer</h1>
        </div>
        <Reticles></Reticles>

      </div>
    );
  }
  
}