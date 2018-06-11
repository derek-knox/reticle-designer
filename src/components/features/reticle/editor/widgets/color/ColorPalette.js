import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import ColorSwatch from './ColorSwatch';

@inject('stores')
@observer
export default class ColorPalette extends Component {

    render() {

        return (
            <div className='widget-helper-grid-color-row'>
                {this.props.palette.colors.map((color, idx) => {
                    return <ColorSwatch key={idx} reticleInFocus={this.props.reticleInFocus} color={color} />;
                })}
            </div>
        );
    }

}