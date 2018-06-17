import React, {Component} from 'react';
import { action, observe, observable } from "mobx";
import {inject, observer} from 'mobx-react';

import classnames from "classnames";

import Graphic from '../../../Graphic';

@inject('stores')
@observer
export default class GraphicWidgetGrid extends Component {

    @observable initialGraphicId = null;
    unobserve = null;

    constructor(props) {
        super(props);
        this.unobserve = observe(this.props.stores.reticlesStore, 'reticleInFocus', this.onChangeReticleInFocus);
    }

    componentDidUpdate() {
        if(this.props.isReset) {
            this.reset();
        }
    }

    componentWillUnmount() {
        this.unobserve();
    }

    reset() {
        this.props.reticleInFocus.graphic.settings.val = this.initialGraphicId;
    }

    @action.bound onMouseOverGraphic(e, payload) {
        // Prevent quick hover after selection causing graphic to update
        if(this.props.stores.editReticleStore.isGridControlOpen){
            this.props.reticleInFocus.graphic.settings.val = payload;
        }
    }

    @action.bound onClickGraphic(e, payload) {
        this.props.reticleInFocus.graphic.settings.val = payload;
        this.initialGraphicId = payload;
        this.props.stores.editReticleStore.isGridControlOpen = false;
    }

    @action.bound onChangeReticleInFocus(payload) {
        payload.oldValue.graphic.settings.val = this.initialGraphicId;
        this.initialGraphicId = payload.newValue.graphic.settings.val;
    }

    render() {

        const color = this.props.stores.colorStore.getColor(this.props.reticleInFocus.color.settings.val);

        return (
            <div className="widget-helper-grid">
                <div key={'gfx-0'}
                     className={classnames("widget-helper-grid-item",
                         {'is-initially-selected': this.initialGraphicId === null},
                         {'is-selected': this.props.reticleInFocus.graphic.settings.val === null})
                     }
                     onMouseOver={(e) => this.onMouseOverGraphic(e, null)}
                     onClick={(e) => this.onClickGraphic(e, null)}>
                None</div>

                {this.props.stores.editReticleStore.graphics.map((item) => {
                    return (
                        <div key={item.id}
                        className={classnames("widget-helper-grid-item ",
                        {'is-initially-selected': this.initialGraphicId === item.id},
                        {'is-selected': this.props.reticleInFocus.graphic.settings.val === item.id})
                    }
                    onMouseOver={(e) => this.onMouseOverGraphic(e, item.id)}
                    onClick={(e) => this.onClickGraphic(e, item.id)}>
                                <svg className="widget-helper-graphic" width="50px" height="50px">
                                    <Graphic key={item.id}
                                             color={color}
                                             gfxId={item.id}
                                             radius={0}
                                             center={{ x: 25, y: 25 }}
                                             angle={0}
                                             direction={0}
                                             scale={1} />
                                </svg>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

}