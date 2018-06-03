import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { EditControlModel } from '../../../../state/models/EditControlModel';
import GraphicWidget from './widgets/GraphicWidget';
import SliderWidget from "./widgets/SliderWidget";

@inject('stores')
@observer
export default class EditControlWidget extends Component {

    getControlByType = (payload) => {
        if (payload.type === EditControlModel.Type.Range) {
            return <SliderWidget item={payload} {...this.props} />;
        }
        else if (payload.type === EditControlModel.Type.Grid) {
            console.log('use label:', payload.label, 'for dynamic component (Graphic|Color)Widget');
            return <GraphicWidget item={payload} {...this.props} />;
        }
    }

    render() {

        const item = this.props.item;

        return (
            <div className="reticle-editor-control-widget">
                {this.getControlByType(item)}
            </div>
        );
    }

}