import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { EditControlModel } from '../../../../state/models/EditControlModel';
import { ReticleModel } from '../../../../state/models/ReticleModel';
import ColorWidget from './widgets/color/ColorWidget';
import GraphicWidget from './widgets/graphic/GraphicWidget';
import ScaleWidget from "./widgets/scale/ScaleWidget";
import SliderWidget from "./widgets/SliderWidget";
import ToggleRangeWidget from "./widgets/ToggleRangeWidget";
import WeightedSliderWidget from "./widgets/WeightedSliderWidget";

@inject('stores')
@observer
export default class EditControlWidget extends Component {

    getControlByType = (payload) => {
        if (payload.type === EditControlModel.Type.Range) {
            return <SliderWidget item={payload} {...this.props} />;
        }
        else if (payload.type === EditControlModel.Type.WeightedRange) {
            return <WeightedSliderWidget item={payload} {...this.props} />;
        }
        else if (payload.type === EditControlModel.Type.Grid) {
            if(payload.settings.reticleProp === ReticleModel.SettingType.Color) {
                return <ColorWidget item={payload} {...this.props} />;
            } else if (payload.settings.reticleProp === ReticleModel.SettingType.Graphic) {
                return <GraphicWidget item={payload} {...this.props} />;
            } else if (payload.settings.reticleProp === ReticleModel.SettingType.Scale) {
                return <ScaleWidget item={payload} {...this.props} />;
            }
        }
        else if (payload.type === EditControlModel.Type.ToggleRange) {
            return <ToggleRangeWidget item={payload} {...this.props} />;
        }
    }

    render() {

        return (
            <div className="reticle-editor-control-widget">
                {this.getControlByType(this.props.item)}
            </div>
        );
    }

}