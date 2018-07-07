import React, {Component} from 'react';
import { action } from 'mobx';
import {inject, observer} from 'mobx-react';
import classnames from "classnames";

import Reticle from './Reticle';
import { getRadiusFromMouseAndClientRect } from '../../../utils/reticleUtils';

@inject('stores')
@observer
export default class Reticles extends Component {

    constructor(props) {
        super(props);
        this.refReticles = React.createRef();
    }

    componentDidUpdate() {
        if(!this.props.stores.reticlesStore.getHasReticles()) {
            this.props.stores.editReticleStore.updatePositionHelperReticleInFocus(null);
        }
    }

    getTargetValue(e){
        return getRadiusFromMouseAndClientRect({
            event: e.nativeEvent,
            ref: this.refReticles.current
        });
    }

    getHelperLabel() {
        let helperLabel = 'Click & Drag';
        if(this.props.stores.editReticleStore.isDrawing) {
            helperLabel = this.props.stores.reticlesStore.items.length < 2 ? 'Let Go Whenever' : 'You got this shit';
        } else {
            if (this.props.stores.reticlesStore.items.length >= 2) {
                helperLabel = '';
            }
        }
        return helperLabel;
    }

    @action.bound onMouseDown(e) {
        this.props.stores.editReticleStore.isDrawing = true;
        this.props.stores.editReticleStore.updateEditArea({ ref: this.refReticles.current });
        this.props.stores.reticlesStore.add({ radius: this.getTargetValue(e) });
    }
    
    @action.bound onMouseMove(e) {
        if (this.props.stores.editReticleStore.isDrawing && this.props.stores.reticlesStore.reticleInFocus) {
            this.props.stores.reticlesStore.reticleInFocus.updateSettingsValue({ val: this.getTargetValue(e), reticleProp: 'radius' });
        }
    }
    
    @action.bound onMouseUp(e) {
        this.props.stores.editReticleStore.isDrawing = false;
    }

    render() {

        const isEditReady = !this.props.stores.editReticleStore.isDrawing;
        const isHidden = isEditReady && this.props.stores.reticlesStore.items.length >= 2 || this.props.stores.reticlesStore.items.length >= 3;

        return (
            <div id='reticles-snapshot-target' ref={this.refReticles} className='reticles-container'>

                <div className='reticles-drag-target'
                     onMouseDown={this.onMouseDown}
                     onMouseMove={this.onMouseMove}
                     onMouseUp={this.onMouseUp}>
                </div>

                {this.props.stores.reticlesStore.items.map(item =>
                    <Reticle key={item.id} item={item}></Reticle>
                )}
                {this.props.stores.reticlesStore.getHasReticles() && this.props.stores.editReticleStore.positionHelperReticleInFocus
                    ? <Reticle className='reticle-layer-helper' item={this.props.stores.editReticleStore.positionHelperReticleInFocus}></Reticle>
                    : null
                }

                {this.props.stores.editReticleStore.isSnapshotInProcess
                    ? null
                    : <div className={classnames('reticles-directions', { 'is-edit-ready': isEditReady, 'is-hidden': isHidden })}>
                          <span>{this.getHelperLabel()}</span>
                      </div>
                }

            </div>
        );
    }

}