import React, {Component} from 'react';
import { observable } from 'mobx';
import {inject, observer} from 'mobx-react';
import { clamp } from 'lodash';
import classnames from 'classnames';

import LayersContainer from './LayersContainer';
import EditLayerContainer from './EditLayerContainer';

@inject('stores')
@observer
export default class ReticleEditor extends Component {

    @observable refEditor = null;
    offsetH = 20;

    constructor(props) {
        super(props);
        this.refEditor = React.createRef();
    }

    getClampedPoint(payload) {
        const editAreaInfo = this.props.stores.editReticleStore.editAreaInfo;
        const x = this.refEditor.current ? clamp(payload.x + this.offsetH, 0, (editAreaInfo.rect.width / 2) - this.refEditor.current.clientWidth - this.offsetH) : 0;
        const y = payload.y;
        return { x, y }
    }

    getTransformStyle(payload) {
        const applyTransform = this.props.stores.reticlesStore.lastReticleInFocus === this.props.stores.reticlesStore.reticleInFocus && this.props.stores.editReticleStore.isDrawing;
        const previousTransform = this.refEditor.current ? this.refEditor.current.style.transform : null;
        return { transform: applyTransform ? 'translate(' + payload.point.x + 'px, ' + payload.point.y + 'px)' : previousTransform };
    }

    render() {

        const x = this.props.stores.reticlesStore.lastReticleInFocus ? this.props.stores.reticlesStore.lastReticleInFocus.radius.settings.val : 0;
        const y = this.refEditor.current ? -this.refEditor.current.clientHeight/2 : 0;
        const point = this.getClampedPoint({ x, y });

        return (
            <div className={classnames('reticle-editor-container', {'is-edit-ready': !this.props.stores.editReticleStore.isDrawing})}
                 ref={this.refEditor}
                 style={this.getTransformStyle({ point })} >
                 
                <LayersContainer></LayersContainer>
                <EditLayerContainer></EditLayerContainer>
               
            </div>
        );
    }

}