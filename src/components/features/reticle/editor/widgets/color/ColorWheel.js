import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import classnames from 'classnames';

@inject('stores')
@observer
export default class ColorWheel extends Component {

    render() {
        return (
            <div className='color-wheel'>
                {this.props.palette.colors.map((color, idx) => {
                        return (
                            <div className={classnames('color-wheel-slice',
                                    { 'is-selected': this.props.colorInFocusIndex === idx })}
                                 key={idx}
                                 style={{ backgroundColor: color }} ></div>
                        );
                    })             
                }
            </div>
        );
    }

}