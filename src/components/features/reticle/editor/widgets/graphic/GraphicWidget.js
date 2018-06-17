import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';

import Button from "@material-ui/core/Button";

import Graphic from "../../../Graphic";

@inject('stores')
@observer
export default class GraphicWidget extends Component {

    @action.bound onClickOpenGrid(e) {
        this.props.stores.editReticleStore.isGridControlOpen = true;
    }

    render() {

        const reticleInFocus = this.props.stores.reticlesStore.reticleInFocus;
        const graphicId = reticleInFocus.graphic.settings.val;
        const color = this.props.stores.colorStore.getColor(reticleInFocus.color.settings.val);

        return (
            <div className="graphic-widget">
                <Button className="open-grid-button"
                        onClick={this.onClickOpenGrid}>
                    {graphicId
                        ? <svg className="widget-helper-graphic" width="50px" height="50px">
                            <Graphic key={graphicId}
                                     color={color}
                                     gfxId={graphicId}
                                     radius={0}
                                     center={{ x: 25, y: 25 }}
                                     angle={0}
                                     direction={0}
                                     scale={1} />
                          </svg>
                        : 'None'
                    }
                </Button>
            </div>
        );
    }

}