import React, {Component} from 'react';
import { action, observe, observable } from "mobx";
import {inject, observer} from 'mobx-react';

import classnames from "classnames";

import ColorPalette from "./ColorPalette";

@inject('stores')
@observer

export default class ColorWidgetGrid extends Component {

    @observable initialColorId = null;
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
        this.props.reticleInFocus.color.settings.val = this.initialColorId;
    }

    @action.bound onMouseOverColor(e, payload) {
        // Prevent quick hover after selection causing graphic to update
        if(this.props.stores.editReticleStore.isGridControlOpen){
            this.props.reticleInFocus.color.settings.val = payload;
        }
    }

    @action.bound onClickColor(e, payload) {
        this.props.reticleInFocus.color.settings.val = payload;
        this.initialColorId = payload;
        this.props.stores.editReticleStore.isGridControlOpen = false;
    }

    @action.bound onChangeReticleInFocus(payload) {
        payload.oldValue.color.settings.val = this.initialColorId;
        this.initialColorId = payload.newValue.color.settings.val;
    }

    render() {

        return (
            <div className="widget-helper-grid widget-helper-grid-color">
                {this.props.stores.colorStore.items.map((palette) => {
                        return <ColorPalette key={palette.id} palette={palette} />
                    })
                }
            </div>
        );
    }

}