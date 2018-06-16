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

        console.log(coloredSlices)

        return (
            <div className='color-wheel'>
                <svg width='100%' height='100%'>
                {coloredSlices.map((coloredSlice, idx) => {
                    return (
                        <ColorWedge className={classnames('color-wheel-wedge',
                                        { 'is-selected': this.props.colorInFocusIndex === idx })}
                                    key={idx}
                                    color={coloredSlice.color}
                                    radius={coloredSlice.radius}
                                    center={{ x: coloredSlice.x, y: coloredSlice.y }}
                                    start={coloredSlice.startAngle}
                                    end={coloredSlice.endAngle}></ColorWedge>
                    );
                })}
                </svg>
            </div>
        );
    }

}