import React, { Component } from 'react';
import { action } from "mobx";
import { inject, observer } from 'mobx-react';

import { keydownScoped } from "react-keydown";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Divider } from 'material-ui';

@inject('stores')
@observer
export default class DualSliderWidget extends Component {

    @keydownScoped('left', 'right') onKeyDownHorizontal(e) {
        const step = this.props.item.settings.step * (e.key === "ArrowLeft" ? -1 : 1);
        this.onSliderChange({ x: this.props.item.settings.val.x + step, y: this.props.item.settings.val.y });
    }
    @keydownScoped('up', 'down') onKeyDownVertical(e) {
        const step = this.props.item.settings.step * (e.key === "ArrowDown" ? -1 : 1);
        this.onSliderChange({ x: this.props.item.settings.val.x, y: this.props.item.settings.val.y + step });
    }
    @keydownScoped('shift+left', 'shift+right') onKeyShiftHorizontal(e) {
        const step = this.props.item.settings.step * (e.key === "ArrowLeft" ? -10 : 10);
        this.onSliderChange({ x: this.props.item.settings.val.x + step, y: this.props.item.settings.val.y });
    }
    @keydownScoped('shift+up', 'shift+down') onKeyShiftVertical(e) {
        const step = this.props.item.settings.step * (e.key === "ArrowDown" ? -10 : 10);
        this.onSliderChange({ x: this.props.item.settings.val.x, y: this.props.item.settings.val.y + step });
    }

    @action.bound onSliderChange(payload) {
        this.props.stores.reticlesStore.reticleInFocus.updateSettingsValue({ val: payload, reticleProp: this.props.item.settings.reticleProp });
    }

    render() {

        const item = this.props.item;
        const val = this.props.stores.reticlesStore.reticleInFocus[item.settings.reticleProp].settings.val;

        return (
            <div className='widget-dual-slider'>
            
                <Slider value={val.x}
                        min={item.settings.min}
                        max={item.settings.max}
                        step={item.settings.step}
                        onChange={(x) => this.onSliderChange({ x: x, y: val.y })}
                        trackStyle={{ backgroundColor: '#99cc33', height: '2px' }}
                        railStyle={{ backgroundColor: '#333333', height: '2px' }}
                        handleStyle={{ borderColor: '#99cc33', backgroundColor: '#99cc33', marginTop: '-6px', boxShadow: '0 0 5px #444' }} />

                <div className='widget-dual-slider-spacer'></div>

                <Slider value={val.y}
                        min={item.settings.min}
                        max={item.settings.max}
                        step={item.settings.step}
                        onChange={(y) => this.onSliderChange({ x: val.x, y: y })}
                        trackStyle={{ backgroundColor: '#99cc33', height: '2px' }}
                        railStyle={{ backgroundColor: '#333333', height: '2px' }}
                        handleStyle={{ borderColor: '#99cc33', backgroundColor: '#99cc33', marginTop: '-6px', boxShadow: '0 0 5px #444' }} />
            </div>
        )
    }

}