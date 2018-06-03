import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';

import Button from "@material-ui/core/Button";

import {EditControlModel} from '../../../../../state/models/EditControlModel';
import Graphic from "../../Graphic";

@inject('stores')
@observer
export default class WidgetHelper extends Component {

    initialGraphicId = null;

    componentDidMount() {
        this.initialGraphicId = this.props.reticleInFocus.graphic.settings.val;
    }
    
    componentDidUpdate() {
        if(this.props.controlInFocus.type !== EditControlModel.Type.Grid && this.props.stores.editReticleStore.isGridControlOpen) {
            this.props.stores.editReticleStore.isGridControlOpen = false;
        }
    }
    
    @action.bound onClickClose(e) {
        this.props.reticleInFocus.graphic.settings.val = this.initialGraphicId;
        this.props.stores.editReticleStore.isGridControlOpen = false;
    }

    @action.bound onMouseOverGraphic(e, payload) {
        this.props.reticleInFocus.graphic.settings.val = payload;
    }

    @action.bound onClickGraphic(e, payload) {
        this.props.reticleInFocus.graphic.settings.val = payload;
        this.initialGraphicId = payload;
        this.props.stores.editReticleStore.isGridControlOpen = false;
    }

    render() {

        const reticleInFocus = this.props.reticleInFocus;
        const type = this.props.controlInFocus.type;

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
                        <div className={"widget-helper-grid " + (!this.props.stores.editReticleStore.isGridControlOpen ? 'hidden' : ' ')}>

                            <div key={'gfx-0'}
                                 className={"widget-helper-grid-item " +
                                     (this.initialGraphicId === null ? 'is-initially-selected ' : ' ') +
                                     (this.props.reticleInFocus.graphic.settings.val === null ? 'is-selected' : '')
                                 }
                                 onMouseOver={(e) => this.onMouseOverGraphic(e, null)}
                                 onClick={(e) => this.onClickGraphic(e, null)}>
                            None</div>

                            {this.props.stores.editReticleStore.graphics.map((item) => {
                                    return (
                                        <div key={item.id}
                                             className={"widget-helper-grid-item " + 
                                                        (this.initialGraphicId === item.id ? 'is-initially-selected ' : ' ') +
                                                        (this.props.reticleInFocus.graphic.settings.val === item.id ? 'is-selected' : '')
                                                       }
                                             onMouseOver={(e) => this.onMouseOverGraphic(e, item.id)}
                                             onClick={(e) => this.onClickGraphic(e, item.id)}>
                                            <svg className="widget-helper-graphic" width="100%" height="100%">
                                                <Graphic key={item.id}
                                                         gfxId={item.id}
                                                         radius={0}
                                                         center={{ x: 0, y: 0 }}
                                                         angle={0}
                                                         direction={0}
                                                         scale={1} />
                                            </svg>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}