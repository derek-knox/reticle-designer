import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import { zipWith } from "lodash";

import classnames from 'classnames';

import { getArcDataFromDivisionCount } from '../../../../../../utils/reticleUtils';
import ColorWedge from './ColorWedge';

@inject('stores')
@observer
export default class ColorWheel extends Component {

    render() {

        const arcs = getArcDataFromDivisionCount({ divisions: 5 });
        const slices = arcs.map(arcData => {
            return {
                x: this.props.size,
                y: this.props.size,
                radius: this.props.size,
                startAngle: arcData.start,
                endAngle: arcData.end
            };
        });
        const coloredSlices = zipWith(this.props.palette.colors, slices, (color, slice) => {
            return {
                color: color,
                ...slice
            }
        });
        const offset = this.props.offset || 0;
        
        return (
            <div className='color-wheel'>
                <svg width='100%' height='100%'>
                    {coloredSlices.map((coloredSlice, idx) => {
                        return (
                            <ColorWedge key={idx}
                                        className={classnames('color-wheel-wedge',
                                            { 'is-selected': this.props.colorInFocusIndex === idx })}
                                        isFocused={this.props.colorInFocusIndex === idx}
                                        color={coloredSlice.color}
                                        radius={coloredSlice.radius}
                                        center={{ x: coloredSlice.x, y: coloredSlice.y }}
                                        offset={offset}
                                        start={coloredSlice.startAngle}
                                        end={coloredSlice.endAngle}></ColorWedge>
                        );
                    })}
                </svg>
            </div>
        );
    }

}