import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import { describeSvgArc } from '../../../utils/reticleUtils';

@inject('stores')
@observer
export default class Arc extends Component {

    render() {
        return (
            <path fill="none"
                  stroke={this.props.color}
                  strokeWidth={this.props.thickness}
                  d={describeSvgArc({ x: this.props.center.x,
                                      y: this.props.center.y,
                                      radius: this.props.radius,
                                      startAngle: this.props.start,
                                      endAngle: this.props.end })} />
        );
    }

}