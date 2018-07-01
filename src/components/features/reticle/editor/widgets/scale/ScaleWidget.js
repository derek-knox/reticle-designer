import React, { Component } from 'react';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';

import Button from "@material-ui/core/Button";

@inject('stores')
@observer
export default class ScaleWidget extends Component {

    @action.bound onClickOpenGrid(e) {
        this.props.stores.editReticleStore.isGridControlOpen = true;
    }

    render() {

        const reticleInFocus = this.props.stores.reticlesStore.reticleInFocus;

        return (
            <div className="graphic-widget">
                <Button className="open-grid-button"
                    onClick={this.onClickOpenGrid}>
                    TEST
                </Button>
            </div>
        );
    }

}