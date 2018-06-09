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
        const offsetPoint = { x: point.x - this.offsetRect.width / 2, y: point.y - this.offsetRect.height / 2 };
        const transformPoint = { x: offsetPoint.x + this.offsetRect.width / 2, y: offsetPoint.y + this.offsetRect.height / 2 };
        
        let rotation = this.props.direction + this.props.angle;
        if(rotation > 360) rotation -= 360;

        return (
            <use href={'#' + gfxId}
                 ref={this.refEl}
                 style={{
                    transform: "rotate(" + rotation + "deg) scale(" + this.props.scale + ")",
                    transformOrigin: transformPoint.x + "px " + transformPoint.y + "px"
                 }}
                 x={offsetPoint.x}
                 y={offsetPoint.y} />
        );
    }

}