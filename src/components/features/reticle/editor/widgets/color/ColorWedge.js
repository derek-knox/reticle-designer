import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { describeSvgWedge } from '../../../../../../utils/reticleUtils';

@inject('stores')
@observer
export default class ColorWedge extends Component {

    render() {
        return (
            <path fill={this.props.color}
                  d={describeSvgWedge({ x: this.props.center.x,
                                        y: this.props.center.y,
                                        radius: this.props.radius,
                                        startAngle: this.props.start,
                                        endAngle: this.props.end
                                      })} />
        );
    }

}