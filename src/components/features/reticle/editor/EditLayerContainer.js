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

                            <EditControl
                                item={this.props.stores.reticlesStore.reticleInFocus.color}
                                onRef={component => this[this.props.stores.reticlesStore.reticleInFocus.color.settings.reticleProp] = component}
                                hasDivider={this.controlsWithSpacers.find((ctrl) => ctrl.label === this.props.stores.reticlesStore.reticleInFocus.color.settings.reticleProp)}
                                isVisible={controlVisibility[this.props.stores.reticlesStore.reticleInFocus.color.settings.reticleProp]}
                                isLocked={false}
                                controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}>
                            </EditControl>

                            <EditControl
                                item={this.props.stores.reticlesStore.reticleInFocus.opacity}
                                onRef={component => this[this.props.stores.reticlesStore.reticleInFocus.opacity.settings.reticleProp] = component}
                                hasDivider={this.controlsWithSpacers.find((ctrl) => ctrl.label === this.props.stores.reticlesStore.reticleInFocus.opacity.settings.reticleProp)}
                                isVisible={controlVisibility[this.props.stores.reticlesStore.reticleInFocus.opacity.settings.reticleProp]}
                                isLocked={false}
                                controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}>
                            </EditControl>

                            <EditControl
                                item={this.props.stores.reticlesStore.reticleInFocus.radius}
                                onRef={component => this[this.props.stores.reticlesStore.reticleInFocus.radius.settings.reticleProp] = component}
                                hasDivider={this.controlsWithSpacers.find((ctrl) => ctrl.label === this.props.stores.reticlesStore.reticleInFocus.radius.settings.reticleProp)}
                                isVisible={controlVisibility[this.props.stores.reticlesStore.reticleInFocus.radius.settings.reticleProp]}
                                isLocked={false}
                                controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}>
                            </EditControl>

                            <EditControl
                                item={this.props.stores.reticlesStore.reticleInFocus.thickness}
                                onRef={component => this[this.props.stores.reticlesStore.reticleInFocus.thickness.settings.reticleProp] = component}
                                hasDivider={this.controlsWithSpacers.find((ctrl) => ctrl.label === this.props.stores.reticlesStore.reticleInFocus.thickness.settings.reticleProp)}
                                isVisible={controlVisibility[this.props.stores.reticlesStore.reticleInFocus.thickness.settings.reticleProp]}
                                isLocked={false}
                                controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}>
                            </EditControl>

                            <EditControl
                                item={this.props.stores.reticlesStore.reticleInFocus.divisions}
                                onRef={component => this[this.props.stores.reticlesStore.reticleInFocus.divisions.settings.reticleProp] = component}
                                hasDivider={this.controlsWithSpacers.find((ctrl) => ctrl.label === this.props.stores.reticlesStore.reticleInFocus.divisions.settings.reticleProp)}
                                isVisible={controlVisibility[this.props.stores.reticlesStore.reticleInFocus.divisions.settings.reticleProp]}
                                isLocked={!this.props.stores.progressiveDisclosureStore.hasCompletedGoal1()}
                                controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}>
                            </EditControl>

                            <EditControl
                                item={this.props.stores.reticlesStore.reticleInFocus.spacing}
                                onRef={component => this[this.props.stores.reticlesStore.reticleInFocus.spacing.settings.reticleProp] = component}
                                hasDivider={this.controlsWithSpacers.find((ctrl) => ctrl.label === this.props.stores.reticlesStore.reticleInFocus.spacing.settings.reticleProp)}
                                isVisible={controlVisibility[this.props.stores.reticlesStore.reticleInFocus.spacing.settings.reticleProp]}
                                isLocked={!this.props.stores.progressiveDisclosureStore.hasCompletedGoal1()}
                                controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}>
                            </EditControl>

                            <EditControl
                                item={this.props.stores.reticlesStore.reticleInFocus.rotation}
                                onRef={component => this[this.props.stores.reticlesStore.reticleInFocus.rotation.settings.reticleProp] = component}
                                hasDivider={this.controlsWithSpacers.find((ctrl) => ctrl.label === this.props.stores.reticlesStore.reticleInFocus.rotation.settings.reticleProp)}
                                isVisible={controlVisibility[this.props.stores.reticlesStore.reticleInFocus.rotation.settings.reticleProp]}
                                isLocked={!this.props.stores.progressiveDisclosureStore.hasCompletedGoal1()}
                                controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}>
                            </EditControl>

                            <EditControl
                                item={this.props.stores.reticlesStore.reticleInFocus.graphic}
                                onRef={component => this[this.props.stores.reticlesStore.reticleInFocus.graphic.settings.reticleProp] = component}
                                hasDivider={this.controlsWithSpacers.find((ctrl) => ctrl.label === this.props.stores.reticlesStore.reticleInFocus.graphic.settings.reticleProp)}
                                isVisible={controlVisibility[this.props.stores.reticlesStore.reticleInFocus.graphic.settings.reticleProp]}
                                isLocked={!this.props.stores.progressiveDisclosureStore.hasCompletedGoal2()}
                                controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}>
                            </EditControl>

                            <EditControl
                                item={this.props.stores.reticlesStore.reticleInFocus.stroke}
                                onRef={component => this[this.props.stores.reticlesStore.reticleInFocus.stroke.settings.reticleProp] = component}
                                hasDivider={this.controlsWithSpacers.find((ctrl) => ctrl.label === this.props.stores.reticlesStore.reticleInFocus.stroke.settings.reticleProp)}
                                isVisible={controlVisibility[this.props.stores.reticlesStore.reticleInFocus.stroke.settings.reticleProp]}
                                isLocked={!this.props.stores.progressiveDisclosureStore.hasCompletedGoal2()}
                                controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}>
                            </EditControl>

                            <EditControl
                                item={this.props.stores.reticlesStore.reticleInFocus.direction}
                                onRef={component => this[this.props.stores.reticlesStore.reticleInFocus.direction.settings.reticleProp] = component}
                                hasDivider={this.controlsWithSpacers.find((ctrl) => ctrl.label === this.props.stores.reticlesStore.reticleInFocus.direction.settings.reticleProp)}
                                isVisible={controlVisibility[this.props.stores.reticlesStore.reticleInFocus.direction.settings.reticleProp]}
                                isLocked={!this.props.stores.progressiveDisclosureStore.hasCompletedGoal2()}
                                controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}>
                            </EditControl>

                            <EditControl
                                item={this.props.stores.reticlesStore.reticleInFocus.scale}
                                onRef={component => this[this.props.stores.reticlesStore.reticleInFocus.scale.settings.reticleProp] = component}
                                hasDivider={this.controlsWithSpacers.find((ctrl) => ctrl.label === this.props.stores.reticlesStore.reticleInFocus.scale.settings.reticleProp)}
                                isVisible={controlVisibility[this.props.stores.reticlesStore.reticleInFocus.scale.settings.reticleProp]}
                                isLocked={!this.props.stores.progressiveDisclosureStore.hasCompletedGoal2()}
                                controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}>
                            </EditControl>

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