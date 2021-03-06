import React, { Component } from 'react';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';

import ColorPalette from './ColorPalette';
import ColorWheel from './ColorWheel';

@inject('stores')
@observer
export default class ColorWidget extends Component {

    @action.bound onClickOpenGrid(e) {
        this.props.stores.editReticleStore.isGridControlOpen = true;
    }

    render() {

        const palette = this.props.stores.colorStore.colorPaletteInFocus;
        const colorInFocusIndex = this.props.stores.reticlesStore.reticleInFocus.color.settings.val;
        
        return (
            <div className="widget-color">
                <ColorPalette key={palette.id} palette={palette} />
                <div className="open-grid-button color-grid-button"
                     onClick={this.onClickOpenGrid}>
                    <ColorWheel palette={palette} colorInFocusIndex={colorInFocusIndex} size={10} offset={6} />
                </div>
            </div>
        );
    }

}