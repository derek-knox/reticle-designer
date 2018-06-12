import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';

import classnames from 'classnames';

@inject('stores')
@observer
export default class ColorSwatch extends Component {

    @action.bound onClickSwatch() {
        this.props.stores.reticlesStore.reticleInFocus.updateSettingsValue({ val: this.props.colorIndex, reticleProp: 'color' });
    }

    render() {

        const color = this.props.stores.colorStore.getColor(this.props.colorIndex);

        console.log('TODO, likely plan out initiColorIndex in palette component and pass in? or something similar')

        return (
            <div className={classnames("color-item",
                    { 'is-initially-selected': this.props.stores.reticlesStore.reticleInFocus.color.settings.val === this.props.colorIndex },
                    { 'is-selected': this.props.stores.reticlesStore.reticleInFocus.color.settings.val === this.props.colorIndex })}
                 onClick={this.onClickSwatch}>
                <div className='color-swatch' style={{ backgroundColor: color }}></div>
            </div>
        );
    }

}