import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import {polarToCartesian} from "../../../utils/reticleUtils";

@inject('stores')
@observer
export default class Graphic extends Component {

    constructor(props) {
        super(props);
        this.refEl = React.createRef();
        this.offsetRect = { width: 0, height: 0 };
    }

    componentDidMount() {
        this.offsetRect = this.refEl.current.getBBox();
    }

    render() {

        const gfxId = this.props.gfxId;
        const point = polarToCartesian(this.props.center.x, this.props.center.y, this.props.radius, this.props.angle);
        const offsetPoint = { x: point.x - this.offsetRect.width / 2, y: point.y - this.offsetRect.height / 2 };
        const transformPoint = { x: offsetPoint.x + this.offsetRect.width / 2, y: offsetPoint.y + this.offsetRect.height / 2 };

        return (
            <use href={'#' + gfxId}
                 ref={this.refEl}
                 style={{
                    'transform': "rotate(" + this.props.direction + "deg) scale(" + this.props.scale + ")",
                    'transform-origin': transformPoint.x + "px " + transformPoint.y + "px"
                 }}
                 x={offsetPoint.x}
                 y={offsetPoint.y} />
        );
    }

}