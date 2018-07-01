import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import simulateEvent from "simulate-event";
import classnames from 'classnames';

import {ReticleModel} from '../../../../state/models/ReticleModel';
import EditControl from './EditControl';
import WidgetHelper from './widgets/WidgetHelper';

@inject('stores')
@observer
export default class EditLayerContainer extends Component {


    constructor(props) {
        super(props);
        this.controlsWithSpacers = [ReticleModel.SettingType.Opacity, ReticleModel.SettingType.Thickness, ReticleModel.SettingType.Rotation];
    }

    componentDidUpdate() {
        this.simulateEvent();
    }

    simulateEvent() {
        const simulateClickTarget = this[this.props.stores.reticlesStore.reticleInFocus.controlInFocus.label];
        if (simulateClickTarget) {
          simulateEvent.simulate(simulateClickTarget.refEl.current, "click");
        }
    }

    render() {

        const controlVisibility = this.props.stores.reticlesStore.reticleInFocus.getControlsVisibility();

        return (
            <div className="container reticle-editor-edit-container">
                <div className="wrapper">
                    <div className="content-v">
                
                        <div className='reticle-editor-heading'>{this.props.stores.reticlesStore.reticleInFocus.label}</div>

                        <div className={classnames('reticle-editor-layer-controls', {'is-grid-control-open': this.props.stores.editReticleStore.isGridControlOpen})}>
                            {this.props.stores.reticlesStore.reticleInFocus.controls.map(item =>
                                <EditControl key={item.id}
                                             item={item}
                                             onRef={component => this[item.label] = component}
                                             hasDivider={this.controlsWithSpacers.includes(item.settings.reticleProp)}
                                             isVisible={controlVisibility[item.settings.reticleProp]}
                                             controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}></EditControl>
                            )}


                            <div className='reticle-editor-widget-helper'>
                                <WidgetHelper reticleInFocus={this.props.stores.reticlesStore.reticleInFocus}
                                              controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}