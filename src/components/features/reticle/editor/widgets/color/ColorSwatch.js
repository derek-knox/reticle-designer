import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class ColorSwatch extends Component {

    render() {

        return (
            <div className='color-item'>
                <div className='color-swatch' style={{ backgroundColor: this.props.color }}></div>
            </div>
        );
    }

}