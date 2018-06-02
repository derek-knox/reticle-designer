import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import simulateEvent from "simulate-event";

import EditControl from './EditControl';
import WidgetHelper from './widgets/WidgetHelper';

@inject('stores')
@observer
export default class EditLayerContainer extends Component {

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

        return (
            <div className="container reticle-editor-edit-container">
                <div className="wrapper">
                    <div className="content-v">
                
                        <div className='reticle-editor-heading'>{this.props.stores.reticlesStore.reticleInFocus.label}</div>

                        <div className={'reticle-editor-layer-controls ' + (this.props.stores.editReticleStore.isGridControlOpen ? 'is-grid-control-open' : '')}>
                            {this.props.stores.reticlesStore.reticleInFocus.controls.map(item =>
                                <EditControl key={item.id}
                                             item={item}
                                             onRef={component => this[item.label] = component}
                                             controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus}></EditControl>
                            )}

                            <div className='reticle-editor-widget-helper'>
                                <WidgetHelper controlInFocus={this.props.stores.reticlesStore.reticleInFocus.controlInFocus} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}