import React, {Component} from 'react';
import {action, observable} from 'mobx';
import {inject, observer} from 'mobx-react';

import Button from "@material-ui/core/Button";

import {EditControlModel} from '../../../../../state/models/EditControlModel';
import { ReticleModel } from '../../../../../state/models/ReticleModel';
import ColorWidgetGrid from './color/ColorWidgetGrid';
import GraphicWidgetGrid from './graphic/GraphicWidgetGrid';
import ScaleWidgetGrid from './scale/ScaleWidgetGrid';

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

    getWidgetGridByType(payload) {
        const control = this.props.controlInFocus;
        if(control.settings.reticleProp === ReticleModel.SettingType.Color) {
            return <ColorWidgetGrid reticleInFocus={this.props.reticleInFocus} isReset={this.isReset} />;
        } else if (control.settings.reticleProp === ReticleModel.SettingType.Graphic){
            return <GraphicWidgetGrid reticleInFocus={this.props.reticleInFocus} isReset={this.isReset} />;
        } else if (control.settings.reticleProp === ReticleModel.SettingType.Scale){
            return <ScaleWidgetGrid reticleInFocus={this.props.reticleInFocus} isReset={this.isReset} />;
        }
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
                        {this.getWidgetGridByType()}
                    </div>
                </div>
            </div>
        );
    }

}