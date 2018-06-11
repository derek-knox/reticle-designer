import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import ColorPalette from "./ColorPalette";

@inject('stores')
@observer

export default class ColorWidgetGrid extends Component {

    render() {

        return (
            <div className="widget-helper-grid widget-helper-grid-color">
                ...
            </div>
        );
    }

}