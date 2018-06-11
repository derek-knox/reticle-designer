import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import ColorWheel from "./ColorWheel";

@inject('stores')
@observer

export default class ColorWidgetGrid extends Component {

    onMouseOverPalette(e, payload) {
        console.log('over', payload);
    }
    
    onClickPalette(e, payload) {
        this.props.stores.colorStore.updateColorPaletteInFocus({ id: payload });
    }

    render() {

        return (
            <div className="widget-helper-grid">
                {this.props.stores.colorStore.items.map((item) => {
                        return (
                            <div key={item.id}
                                 className="widget-helper-grid-item"
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