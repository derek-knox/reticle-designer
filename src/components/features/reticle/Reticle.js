import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import { getArcDataFromDivisionCount } from '../../../utils/reticleUtils';
import Arc from './Arc';
import Graphic from "./Graphic";

@inject('stores')
@observer
export default class Reticle extends Component {

    render() {

        const item = this.props.item;
        const editAreaInfo = this.props.stores.editReticleStore.editAreaInfo;
        const arcs = getArcDataFromDivisionCount({ divisions: item.divisions.settings.val });

        return (
            <svg className='reticle' width='100%' height='100%' style={{ transform: "rotate(" + item.rotation.settings.val + "deg)", opacity: item.opacity.settings.val }}>
                {item.divisions.settings.val === 0
                    ? <circle stroke={'red'} cx="50%" cy="50%" r={item.radius.settings.val} strokeWidth={item.thickness.settings.val} fill="none" />
                    : arcs.map((arcData) => {
                        return item.divisions.settings.val > 0 && item.graphic.settings.val
                            ? <Graphic key={arcData.id}
                                       gfxId={item.graphic.settings.val}
                                       radius={item.radius.settings.val}
                                       center={{ x: editAreaInfo.point.x, y: editAreaInfo.point.y }}
                                       angle={arcData.start}
                                       direction={item.direction.settings.val}
                                       scale={item.scale.settings.val} />
                            : <Arc key={arcData.id}
                                   thickness={item.thickness.settings.val}
                                   radius={item.radius.settings.val}
                                   center={{ x: editAreaInfo.point.x, y: editAreaInfo.point.y }}
                                   start={arcData.start}
                                   end={arcData.end - item.spacing.settings.val}></Arc>
                        })
                }
            </svg>
        );
    }

}