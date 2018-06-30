import React, {Component} from 'react';
import { observable } from 'mobx';
import {inject, observer} from 'mobx-react';

import {polarToCartesian} from "../../../utils/reticleUtils";

@inject('stores')
@observer
export default class Graphic extends Component {

    @observable offsetRect = { width: 0, height: 0 };

    constructor(props) {
        super(props);
        this.refEl = React.createRef();
    }

    componentDidMount() {
        this.offsetRect = this.refEl.current.getBBox();
    }

    render() {

        const gfxId = this.props.gfxId;
        const point = polarToCartesian(this.props.center.x, this.props.center.y, this.props.radius, this.props.angle);
        const offsetRectHalved = { width: this.offsetRect.width / 2, height: this.offsetRect.height / 2 };
        const offsetPoint = { x: point.x - offsetRectHalved.width, y: point.y - offsetRectHalved.height };
        const transformPoint = { x: offsetPoint.x + offsetRectHalved.width, y: offsetPoint.y + offsetRectHalved.height };

        let rotation = this.props.direction + this.props.angle;
        if(rotation > 360) rotation -= 360;

        const isStroke = this.props.strokeSettings.isStroke;
        const strokeWidth = isStroke ? this.props.strokeSettings.val : 1;

        return (

            <use href={'#' + gfxId}
                 ref={this.refEl}
                 style={{
                    transform: "rotate(" + rotation + "deg) scale(" + this.props.scale.x + ", " + this.props.scale.y + ")",
                    transformOrigin: transformPoint.x + "px " + transformPoint.y + "px",
                    stroke: this.props.color,
                    strokeWidth: strokeWidth,
                    fill: isStroke ? 'none' : this.props.color
                 }}
                 x={offsetPoint.x}
                 y={offsetPoint.y} />
        );
    }

}