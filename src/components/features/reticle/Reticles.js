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

    getTargetValue(e){
        return getRadiusFromMouseAndClientRect({
            event: e.nativeEvent,
            ref: this.refReticles.current
        });
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
                {this.props.stores.reticlesStore.items.length > 0 && this.props.stores.editReticleStore.positionHelperReticleInFocus
                    ? <Reticle className='reticle-layer-helper' item={this.props.stores.editReticleStore.positionHelperReticleInFocus}></Reticle>
                    : null
                }

                {this.props.stores.editReticleStore.isSnapshotInProcess
                    ? null
                    : <div className={classnames('reticles-directions', { 'is-edit-ready': !this.props.stores.editReticleStore.isDrawing })}>
                          {this.props.stores.editReticleStore.isDrawing
                              ? <span>Let Go Whenever</span>
                              : this.props.stores.reticlesStore.items.length > 1
                                  ? <span>Click & Drag to Add Reticle<hr />Shift Click & Drag to Select Reticle</span>
                                  : <span>Click & Drag</span>
                          }
                      </div>
                }

            </div>
        );
    }

}