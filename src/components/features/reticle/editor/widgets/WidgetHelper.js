import React, {Component} from 'react';
import {action, observe, observable} from 'mobx';
import {inject, observer} from 'mobx-react';

import Button from "@material-ui/core/Button";

import {EditControlModel} from '../../../../../state/models/EditControlModel';
import GraphicWidgetGrid from './GraphicWidgetGrid';

@inject('stores')
@observer
export default class WidgetHelper extends Component {

    @observable isReset = false;

    componentDidUpdate() {
        if(this.props.controlInFocus.type !== EditControlModel.Type.Grid && this.props.stores.editReticleStore.isGridControlOpen) {
            this.reset();
        }
        this.isReset = false;
    }

    reset() {
        this.isReset = true;
        this.props.stores.editReticleStore.isGridControlOpen = false;
    }
    
    @action.bound onClickClose(e) {
        this.reset();
    }

    render() {
        return (
            <div className="wrapper">
                <div className="content-v widget-helper">
                    <div className="content-h widget-helper-header">
                        <div>
                            {this.props.controlInFocus.label}s
                        </div>
                        <Button className="widget-helper-close-button"
                                onClick={this.onClickClose}>x</Button>
                    </div>
                    <div className="widget-helper-body">
                        <GraphicWidgetGrid reticleInFocus={this.props.reticleInFocus} isReset={this.isReset}></GraphicWidgetGrid>                         
                    </div>
                </div>
            </div>
        );
    }

}