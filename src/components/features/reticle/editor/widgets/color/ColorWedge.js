import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { describeSvgWedge } from '../../../../../../utils/reticleUtils';

@inject('stores')
@observer
export default class ColorWedge extends Component {

    render() {
        return (
            <path fill={this.props.color}
                  stroke={this.props.isFocused ? '#000' : null}
                  strokeWidth={this.props.isFocused ? 1 : 0}
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