import React, { Component } from 'react';
import { action, observable } from "mobx";
import { inject, observer } from 'mobx-react';
import { clamp } from 'lodash';
import mathMap from 'mout/math/map';

import { keydownScoped } from "react-keydown";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

@inject('stores')
@observer
export default class WeightedSliderWidget extends Component {

    @observable weightedVal = null;
    weightedThreshold = .5;
    weightTarget = 10;

    componentDidMount() {
        const item = this.props.item;
        const value = this.props.stores.reticlesStore.reticleInFocus[item.settings.reticleProp].settings.val;
        this.weightedVal = value;
    }

    @keydownScoped('up', 'right') onKeyUpOrRight(e) {
        this.onNudgeChange({ val: this.weightedVal + this.props.item.settings.step });
    }
    @keydownScoped('down', 'left') onKeyDownOrLeft(e) {
        this.onNudgeChange({ val: this.weightedVal - this.props.item.settings.step });
    }
    @keydownScoped('shift+up', 'shift+right') onKeyShiftAndUpOrRight(e) {
        this.onNudgeChange({ val: this.weightedVal + (this.props.item.settings.step * 10) });
    }
    @keydownScoped('shift+down', 'shift+left') onKeyShiftAndDownOrLeft(e) {
        this.onNudgeChange({ val: this.weightedVal - (this.props.item.settings.step * 10) });
    }

    @action.bound updateValue(payload) {
        this.weightedVal = payload;
        this.props.stores.reticlesStore.reticleInFocus.updateSettingsValue({ val: this.weightedVal, reticleProp: this.props.item.settings.reticleProp });
    }

    @action.bound onNudgeChange(payload) {
        this.updateValue(payload.val);
    }

    @action.bound onSliderChange(payload) {
        const percent = payload.val/this.props.item.settings.max;
        if(percent < this.weightedThreshold) {
            this.updateValue(Math.floor(mathMap(percent, 0, this.weightedThreshold, 0, this.weightTarget)));
        } else {
            this.updateValue(Math.floor(mathMap(percent, this.weightedThreshold, 1, this.weightTarget, this.props.item.settings.max)));
        }
    }

    render() {

        const item = this.props.item;
        const value = this.props.stores.reticlesStore.reticleInFocus[item.settings.reticleProp].settings.val;
        const currentValue = parseFloat(value).toFixed(2).replace('.00', '');

        return <div>
            <Slider value={this.weightedVal}
                    min={item.settings.min}
                    max={item.settings.max}
                    step={item.settings.step}
                    onChange={(val) => this.onSliderChange({ val })}
                    trackStyle={{ backgroundColor: '#99cc33', height: '2px' }}
                    railStyle={{ backgroundColor: '#333333', height: '2px' }}
                    handleStyle={{ borderColor: '#99cc33', backgroundColor: '#333', marginTop: '-6px', boxShadow: '0 0 12px #333' }} />
            <span className='control-info control-info-slider-current'>{currentValue}</span>
        </div>
    }

}