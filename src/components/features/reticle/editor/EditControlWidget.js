import React, { Component } from 'react';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { EditControlModel } from '../../../../state/models/EditControlModel';

@inject('stores')
@observer
export default class EditControlWidget extends Component {

    @action.bound onSliderChange(payload) {
        this.props.stores.reticlesStore.reticleInFocus[payload.reticleProp] = payload.val;
    }

    getControlByType = (payload) => {
        if (payload.type === EditControlModel.Type.Range)
            return <Slider value={this.props.stores.reticlesStore.reticleInFocus[payload.settings.reticleProp]}
                           min={payload.settings.min}
                           max={payload.settings.max}
                           onChange={(val) => this.onSliderChange({ val, reticleProp: payload.settings.reticleProp})}
                           trackStyle={{ backgroundColor: '#99cc33' }}
                           railStyle={{ backgroundColor: '#333333' }}
                           handleStyle={{ borderColor: '#99cc33', backgroundColor: '#99cc33' }} />;
        else if (payload.type === EditControlModel.Type.List)
            return '...';
    }

    render() {

        const item = this.props.item;

        return (
            <div className="reticle-editor-control-widget">
                { this.getControlByType(item) }
            </div>
        );
    }

}