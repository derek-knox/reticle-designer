import React, {Component} from 'react';
import { action, observe, observable } from "mobx";
import {inject, observer} from 'mobx-react';

import classnames from "classnames";

import ColorWheel from "./ColorWheel";

@inject('stores')
@observer

export default class ColorWidgetGrid extends Component {
    
    @observable initialPaletteId = this.props.stores.colorStore.colorPaletteInFocus.id;
    unobserve = null;

    constructor(props) {
        super(props);
        this.unobserve = observe(this.props.stores.reticlesStore, 'reticleInFocus', this.onChangeReticleInFocus);
    }

    componentDidUpdate() {
        if (this.props.isReset) {
            this.reset();
        }
    }

    componentWillUnmount() {
        this.unobserve();
    }

    reset() {
        this.props.stores.colorStore.updateColorPaletteInFocus({ id: this.initialPaletteId });
    }

    onMouseOverPalette(e, payload) {
        // Prevent quick hover after selection causing graphic to update
        if (this.props.stores.editReticleStore.isGridControlOpen) {
            this.props.stores.colorStore.updateColorPaletteInFocus({ id: payload });
        }
    }
    
    onClickPalette(e, payload) {
        this.props.stores.colorStore.updateColorPaletteInFocus({ id: payload });
        this.initialPaletteId = payload;
        this.props.stores.editReticleStore.isGridControlOpen = false;
    }

    @action.bound onChangeReticleInFocus(payload) {
        this.reset();
    }

    render() {

        return (
            <div className="widget-helper-grid">
                {this.props.stores.colorStore.items.map((item) => {
                        return (
                            <div key={item.id}
                                 className={classnames("widget-helper-grid-item",
                                    { 'is-initially-selected': this.initialPaletteId === item.id },
                                    { 'is-selected': this.props.stores.colorStore.colorPaletteInFocus.id === item.id })}
                                 onMouseOver={(e) => this.onMouseOverPalette(e, item.id)}
                                 onClick={(e) => this.onClickPalette(e, item.id)}>
                                    <ColorWheel palette={item} />
                            </div>
                        );
                    })
                }
            </div>
        );
    }

}