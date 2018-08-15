import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Reticles from '../features/reticle/Reticles';
import GraphicsLibrary from "../features/reticle/editor/GraphicsLibrary";
import PrecisionSelect from "../features/reticle/precision-panel/PrecisionSelect";
import ReticleEditor from '../features/reticle/editor/ReticleEditor';

import Button from "@material-ui/core/Button";

@inject('stores')
@observer
export default class ReticleDesignerPage extends Component {
  
  render() {

    const isEditorVisible = this.props.stores.reticlesStore.items.length > 0;
    const isPrecisionSelectFocused = this.props.stores.precisionSelectStore.matches.length > 0 && this.props.stores.precisionSelectStore.isVisible;

    return (
      <div className='page'>
        
        <div className="header-container">
          <h1>Reticle Designer</h1>
          <Button className="learn-more-btn" color="primary"><a href="https://derekknox.com/lab/reticledesigner/">Learn More - designed for widescreens & Chrome 67+</a></Button>
        </div>

        <div className='reticle-stage'>
          <Reticles></Reticles>

          <ReticleEditor isVisible={isEditorVisible}></ReticleEditor>

          <PrecisionSelect isFocused={isPrecisionSelectFocused}></PrecisionSelect>

        </div>

        <GraphicsLibrary></GraphicsLibrary>

      </div>
    );
  }
  
}