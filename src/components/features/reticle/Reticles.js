import React, {Component} from 'react';
import { action } from 'mobx';
import {inject, observer} from 'mobx-react';

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