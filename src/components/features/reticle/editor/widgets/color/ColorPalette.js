import React, {Component} from 'react';
import {action, observable} from 'mobx';
import {inject, observer} from 'mobx-react';

import ColorSwatch from './ColorSwatch';

@inject('stores')
@observer
export default class ColorPalette extends Component {

    @observable initialSwatchIndex = this.props.stores.reticlesStore.reticleInFocus.color.settings.val;

    @action updateColorForReticle(payload) {
        this.props.stores.reticlesStore.reticleInFocus.updateSettingsValue({ val: payload, reticleProp: 'color' });
    }

    @action.bound onMouseEnter() {
        this.initialSwatchIndex = this.props.stores.reticlesStore.reticleInFocus.color.settings.val;
    }
    
    @action.bound onMouseLeave() {
        this.updateColorForReticle(this.initialSwatchIndex);
    }

    @action.bound onMouseOverSwatch(payload){
        this.updateColorForReticle(payload);
    }
    
    @action.bound onClickSwatch(payload){
        this.updateColorForReticle(payload);
        this.initialSwatchIndex = payload;
    }

    render() {

        const colorIndexInFocus = this.props.stores.reticlesStore.reticleInFocus.color.settings.val;

        return (
            <div className='widget-helper-grid-color-row'
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}>
                {this.props.palette.colors.map((color, idx) => {
                    return <ColorSwatch key={idx}
                                        color={color}
                                        isSelected={idx === colorIndexInFocus}
                                        isInitiallySelected={idx === this.initialSwatchIndex}
                                        onComponentClick={() => this.onClickSwatch(idx)}
                                        onComponentMouseOver={() => this.onMouseOverSwatch(idx)} />;
                }, this)}
            </div>
        );
    }

}