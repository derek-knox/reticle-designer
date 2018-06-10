import React, { Component } from 'react';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';

import Button from "@material-ui/core/Button";

@inject('stores')
@observer
export default class ColorWidget extends Component {

    @action.bound onClickOpenGrid(e) {
        this.props.stores.editReticleStore.isGridControlOpen = true;
    }

    render() {

        return (
            <div className="color-widget">
                <Button className="open-grid-button"
                    onClick={this.onClickOpenGrid}>
                    colorbox...
                </Button>
            </div>
        );
    }

}