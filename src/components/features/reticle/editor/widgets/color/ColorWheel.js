import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class ColorWheel extends Component {

    render() {
        return (
            <div className='color-wheel'>
                {this.props.palette.colors.map((color, idx) => {
                        return (
                            <div className={'color-wheel-slice'}
                                 key={idx}
                                 style={{ backgroundColor: color }} ></div>
                        );
                    })             
                }
            </div>
        );
    }

}