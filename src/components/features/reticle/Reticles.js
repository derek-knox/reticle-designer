import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { action, observable } from 'mobx';
import {inject, observer} from 'mobx-react';

import Reticle from './Reticle';
import { getRadiusFromMouseAndClientRect } from '../../../utils/reticleUtils';

@inject('stores')
@observer
export default class Reticles extends Component {

    refReticles = null;

    getTargetValue(e){
        return getRadiusFromMouseAndClientRect({
            event: e.nativeEvent,
            ref: this.refReticles
        });
    }

    @action.bound onMouseDown(e) {
        this.props.stores.editReticleStore.isDrawing = true;
        this.refReticles = ReactDOM.findDOMNode(this.refs.reticles);
        this.props.stores.editReticleStore.updateEditArea({ ref: this.refReticles });
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
            <div ref='reticles' className='reticles-container'>

                <div className='reticles-drag-target'
                     onMouseDown={this.onMouseDown}
                     onMouseMove={this.onMouseMove}
                     onMouseUp={this.onMouseUp}>
                </div>

                { this.props.stores.reticlesStore.items.map(item =>
                        <Reticle key={item.id} item={item}></Reticle>
                )}

                <div className='reticles-directions'>
                    { this.props.stores.editReticleStore.isDrawing
                        ? <span>Let Go Whenever</span>
                        : this.props.stores.reticlesStore.items.length > 1
                            ? <span>Click & Drag to Add Reticle<hr/>Shift Click & Drag to Select Reticle</span>
                            : <span>Click & Drag</span>
                    }
                </div>

            </div>
        );
    }

}