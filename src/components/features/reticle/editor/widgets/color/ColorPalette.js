import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class ColorPalette extends Component {

    render() {

        return (
            <div className='widget-helper-grid-color-row'>
                
                <div className="color-item color-wheel">
                    WH
                </div>

                {this.props.palette.colors.map((color, idx) => {
                    return (
                        <div key={idx} className='color-item'>
                            <div className='color-swatch' style={{ backgroundColor: color }}></div>
                        </div>
                    )
                })}
            </div>
        );
    }

}