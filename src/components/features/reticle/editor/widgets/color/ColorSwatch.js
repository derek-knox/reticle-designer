import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class ColorSwatch extends Component {

    @action.bound onClickSwatch() {
        this.props.stores.reticlesStore.reticleInFocus.updateSettingsValue({ val: this.props.colorIndex, reticleProp: 'color' });
    }

    render() {

        const color = this.props.stores.colorStore.getColor(this.props.colorIndex);

        return (
            <div className='color-item'
                 onClick={this.onClickSwatch}>
                <div className='color-swatch' style={{ backgroundColor: color }}></div>
            </div>
        );
    }

}