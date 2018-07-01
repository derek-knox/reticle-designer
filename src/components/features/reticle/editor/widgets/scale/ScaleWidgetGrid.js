import React, { Component } from 'react';
import { action, observe, observable } from "mobx";
import { inject, observer } from 'mobx-react';

import classnames from "classnames";

@inject('stores')
@observer

export default class ScaleWidgetGrid extends Component {

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
        // this.props.stores.colorStore.updateColorTileInFocus({ id: this.initialTileId });
    }

    onMouseOverTile(e, payload) {
        // Prevent quick hover after selection causing graphic to update
        if (this.props.stores.editReticleStore.isGridControlOpen) {
            this.props.stores.colorStore.updateColorTileInFocus({ id: payload });
        }
    }

    onClickTile(e, payload) {
        // this.props.stores.colorStore.updateColorTileInFocus({ id: payload });
        // this.initialTileId = payload;
        this.props.stores.editReticleStore.isGridControlOpen = false;
    }

    @action.bound onChangeReticleInFocus(payload) {
        this.reset();
    }

    render() {

        return (
            <div className="widget-helper-grid">
                Test...
            </div>
        );
    }

}