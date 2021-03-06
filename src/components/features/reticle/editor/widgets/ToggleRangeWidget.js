import React, { Component } from 'react';
import { action } from "mobx";
import { inject, observer } from 'mobx-react';

import { keydownScoped } from "react-keydown";

import Switch from "@material-ui/core/Switch";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

@inject('stores')
@observer
export default class ToggleRangeWidget extends Component {

    @keydownScoped('up', 'right') onKeyUpOrRight(e) {
        this.onSliderChange({ val: this.props.item.settings.val + this.props.item.settings.step });
    }
    @keydownScoped('down', 'left') onKeyDownOrLeft(e) {
        this.onSliderChange({ val: this.props.item.settings.val - this.props.item.settings.step });
    }
    @keydownScoped('shift+up', 'shift+right') onKeyShiftAndUpOrRight(e) {
        this.onSliderChange({ val: this.props.item.settings.val + (this.props.item.settings.step * 10) });
    }
    @keydownScoped('shift+down', 'shift+left') onKeyShiftAndDownOrLeft(e) {
        this.onSliderChange({ val: this.props.item.settings.val - (this.props.item.settings.step * 10) });
    }

    @action.bound onSliderChange(payload) {
        this.props.stores.reticlesStore.reticleInFocus.updateSettingsValue({ val: payload.val, reticleProp: this.props.item.settings.reticleProp });
    }
    
    @action.bound onToggleChange() {
        const currentlyIsStroke = this.props.item.settings.isStroke;
        this.props.stores.reticlesStore.reticleInFocus.updateSettingsValue({ isStroke: !currentlyIsStroke, reticleProp: this.props.item.settings.reticleProp });
    }

    render() {

        const item = this.props.item;
        const value = this.props.stores.reticlesStore.reticleInFocus[item.settings.reticleProp].settings.val;
        const currentValue = parseFloat(value).toFixed(2).replace('.00', '');

        return (
            <div className='widget-toggle-slider'>
                <div className='toggle-stroke-and-fill'>
                    <Switch className='toggle-stroke-and-fill-switch'
                            checked={item.settings.isStroke}
                            onChange={this.onToggleChange}
                            value='isStroke'
                            color='primary'
                    />
                </div>
                {item.settings.isStroke
                 ? <div className='slider-stroke-and-fill-container'>
                    <Slider className='slider-stroke-and-fill'
                            value={value}
                            min={item.settings.min}
                            max={item.settings.max}
                            step={item.settings.step}
                            onChange={(val) => this.onSliderChange({ val })}
                            trackStyle={{ backgroundColor: '#99cc33', height: '2px' }}
                            railStyle={{ backgroundColor: '#333333', height: '2px' }}
                            handleStyle={{ borderColor: '#99cc33', backgroundColor: '#333', marginTop: '-6px', boxShadow: '0 0 12px #333' }} />
                    <span className='control-info control-info-slider-current'>{currentValue}</span>
                   </div>
                 : null
                }
            </div>
        );
    }

}