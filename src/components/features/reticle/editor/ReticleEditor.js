import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {inject, observer} from 'mobx-react';
import { clamp } from 'lodash';

import LayersContainer from './LayersContainer';
import EditLayerContainer from './EditLayerContainer';

@inject('stores')
@observer
export default class ReticleEditor extends Component {

    refEditor = null;
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

    render() {

        const x = this.props.stores.reticlesStore.lastReticleInFocus ? this.props.stores.reticlesStore.lastReticleInFocus.radius : 0;
        const y = this.refEditor.current ? -this.refEditor.current.clientHeight/2 : 0;
        const point = this.getClampedPoint({ x, y })

        return (
            <div className={'reticle-editor-container ' + (this.props.stores.editReticleStore.isDrawing ? '' : 'is-edit-ready')}
                 ref={this.refEditor}
                 style={{ transform: 'translate(' + point.x + 'px, ' + point.y + 'px)'} } >
                 
                <LayersContainer></LayersContainer>
                <EditLayerContainer></EditLayerContainer>
               
            </div>
        );
    }

}