import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { describeSvgWedge, polarToCartesian } from '../../../../../../utils/reticleUtils';

@inject('stores')
@observer
export default class ColorWedge extends Component {

    getTranslation() {
        if (this.props.isFocused) {
            const angle = this.props.end - (this.props.end - this.props.start) / 2;
            const point = polarToCartesian(0, 0, this.props.isFocusedOffset, angle);
            return point;
        } else {
            return { x: 0, y: 0 };
        }
    }
    
    render() {
        
        const translation = this.getTranslation();
        
        return (
            <path fill={this.props.color}
                  stroke={this.props.isFocused ? '#000' : null}
                  strokeWidth={this.props.isFocused ? 1 : 0}
                  transform={'translate(' + translation.x + ', ' + translation.y + ')'}
                  d={describeSvgWedge({ x: this.props.center.x,
                                        y: this.props.center.y,
                                        radius: this.props.radius,
                                        offset: this.props.offset,
                                        startAngle: this.props.start,
                                        endAngle: this.props.end
                                      })} />
        );
    }

}