import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Reticles from '../features/reticle/Reticles';
import GraphicsLibrary from "../features/reticle/editor/GraphicsLibrary";
import ReticleEditor from '../features/reticle/editor/ReticleEditor';

@inject('stores')
@observer
export default class ReticleDesignerPage extends Component {
  
  render() {
    return (
      <div className='page'>
        
        <div className="header-container">
          <h1>Reticle Designer</h1>
        </div>

        <div className='reticle-stage'>
          <Reticles></Reticles>
          {this.props.stores.reticlesStore.items.length > 0
            ? <ReticleEditor></ReticleEditor>
            : null
          }
        </div>

        <GraphicsLibrary></GraphicsLibrary>

      </div>
    );
  }
  
}