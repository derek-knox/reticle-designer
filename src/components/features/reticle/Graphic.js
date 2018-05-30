import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import {polarToCartesian} from "../../../utils/reticleUtils";

@inject('stores')
@observer
export default class Graphic extends Component {

    render() {

        const gfxId = this.props.gfxId;
        const point = polarToCartesian(this.props.center.x, this.props.center.y, this.props.radius, this.props.angle);

        return (
            <use href={'#' + gfxId}
                 x={point.x}
                 y={point.y} />
        );
    }

}