import React, { Component } from 'react';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import { clamp } from 'lodash';
import keydown, { keydownScoped } from 'react-keydown';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { EditControlModel } from '../../../../state/models/EditControlModel';

@inject('stores')
@observer
export default class EditControlWidget extends Component {

    item = null;

    updateSlider(payload) {
        let settings = this.item.settings;
        let newVal = clamp(this.props.stores.reticlesStore.reticleInFocus[settings.reticleProp].settings.val + payload.val, settings.min, settings.max);
        this.onSliderChange({ val: newVal, reticleProp: settings.reticleProp });
    }

    getControlByType = (payload) => {
        if (payload.type === EditControlModel.Type.Range)
            return <Slider value={this.props.stores.reticlesStore.reticleInFocus[payload.settings.reticleProp].settings.val}
                           min={payload.settings.min}
                           max={payload.settings.max}
                           onChange={(val) => this.onSliderChange({ val, reticleProp: payload.settings.reticleProp })}
                           trackStyle={{ backgroundColor: '#99cc33' }}
                           railStyle={{ backgroundColor: '#333333' }}
                           handleStyle={{ borderColor: '#99cc33', backgroundColor: '#99cc33' }} />;
        else if (payload.type === EditControlModel.Type.List)
            return '...';
    }

    @keydownScoped('up', 'right') onKeyUpOrRight(e) { this.updateSlider({ val: +1 }) }
    @keydownScoped('down', 'left') onKeyDownOrLeft(e) { this.updateSlider({ val: -1 }) }
    @keydownScoped('shift+up', 'shift+right') onKeyShiftAndUpOrRight(e) { this.updateSlider({ val: +10 }) }
    @keydownScoped('shift+down', 'shift+left') onKeyShiftAndDownOrLeft(e) { this.updateSlider({ val: -10 }) }

    @action.bound onSliderChange(payload) {
        this.props.stores.reticlesStore.reticleInFocus[payload.reticleProp].settings.val = payload.val;
    }

    render() {

        this.item = this.props.item;

        return (
            <div className="reticle-editor-control-widget">
                { this.getControlByType(this.item) }
            </div>
        );
    }

}