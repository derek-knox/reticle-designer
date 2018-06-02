import React, { Component } from 'react';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import { keydownScoped } from 'react-keydown';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { EditControlModel } from '../../../../state/models/EditControlModel';
import GraphicWidget from './widgets/GraphicWidget';

@inject('stores')
@observer
export default class EditControlWidget extends Component {

    getControlByType = (payload) => {
        if (payload.type === EditControlModel.Type.Range)
            return <Slider value={this.props.stores.reticlesStore.reticleInFocus[payload.settings.reticleProp].settings.val}
                           min={payload.settings.min}
                           max={payload.settings.max}
                           step={payload.settings.step}
                           onChange={(val) => this.onSliderChange({ val })}
                           trackStyle={{ backgroundColor: '#99cc33' }}
                           railStyle={{ backgroundColor: '#333333' }}
                           handleStyle={{ borderColor: '#99cc33', backgroundColor: '#99cc33' }} />;
        else if (payload.type === EditControlModel.Type.List)
            return <GraphicWidget />;
    }

    @keydownScoped('up', 'right') onKeyUpOrRight(e) { this.onSliderChange({ val: this.props.item.settings.val + this.props.item.settings.step }) }
    @keydownScoped('down', 'left') onKeyDownOrLeft(e) { this.onSliderChange({ val: this.props.item.settings.val - this.props.item.settings.step }) }
    @keydownScoped('shift+up', 'shift+right') onKeyShiftAndUpOrRight(e) { this.onSliderChange({ val: this.props.item.settings.val + (this.props.item.settings.val * 10) }) }
    @keydownScoped('shift+down', 'shift+left') onKeyShiftAndDownOrLeft(e) { this.onSliderChange({ val: this.props.item.settings.val - (this.props.item.settings.val * 10) }) }

    @action.bound onSelectChange(payload) {
        this.props.stores.reticlesStore.reticleInFocus.updateSettingsValue({ val: payload.target.value, reticleProp: this.props.item.settings.reticleProp });
    }

    @action.bound onSliderChange(payload) {
        this.props.stores.reticlesStore.reticleInFocus.updateSettingsValue({ val: payload.val, reticleProp: this.props.item.settings.reticleProp });
    }

    render() {

        const item = this.props.item;

        return (
            <div className="reticle-editor-control-widget">
                {this.getControlByType(item)}
            </div>
        );
    }

}