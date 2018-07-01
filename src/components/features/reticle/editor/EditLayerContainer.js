import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import simulateEvent from "simulate-event";
import classnames from 'classnames';

import {ReticleModel} from '../../../../state/models/ReticleModel';
import EditControl from './EditControl';
import WidgetHelper from './widgets/WidgetHelper';
import { observable } from 'mobx';

@inject('stores')
@observer
export default class EditLayerContainer extends Component {

    @observable controlsWithSpacers = [
        { label: ReticleModel.SettingType.Opacity, top: 0 },
        { label: ReticleModel.SettingType.Thickness, top: 0 },
        { label: ReticleModel.SettingType.Rotation, top: 0 }
    ];

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.updateDividerPositions();
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

    updateDividerPositions() {
        this.controlsWithSpacers.forEach((item) => {
            const el = this[item.label].refEl.current;
            item.top = el.offsetTop + el.offsetHeight + 13;
        });
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
                                             onRef={component => this[item.settings.reticleProp] = component}
                                             hasDivider={this.controlsWithSpacers.find((ctrl) => ctrl.label === item.settings.reticleProp)}
                                             isVisible={controlVisibility[item.settings.reticleProp]}
                                             controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}></EditControl>
                            )}

                            {this.controlsWithSpacers.map((item, idx) =>
                                <div className='divider' key={idx} style={ { top: item.top + 'px' }}></div>
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