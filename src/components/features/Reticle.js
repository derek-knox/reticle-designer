import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class Reticle extends Component {

    render() {

        const item = this.props.item;

        return (
            <svg className='reticle' width='100%' height='100%' viewBox="0 0 100% 100%">
                <circle stroke={'red'} cx="50%" cy="50%" r={item.radius} strokeWidth={item.thickness} fill="none" />
            </svg>
        );
    }

}