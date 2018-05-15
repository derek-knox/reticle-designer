import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import Arc from './Arc';

@inject('stores')
@observer
export default class Reticle extends Component {

    render() {

        const item = this.props.item;
        const arcDist = 360 / item.divisions;

        return (
            <svg className='reticle' width='100%' height='100%'>
                {item.divisions === 0
                    ? <circle stroke={'red'} cx="50%" cy="50%" r={item.radius} strokeWidth={item.thickness} fill="none" />
                    : <Arc></Arc>
                }
            </svg>
        );
    }

}