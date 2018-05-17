import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import { getArcDataFromDivisionCount } from '../../../utils/reticleUtils';
import Arc from './Arc';

@inject('stores')
@observer
export default class Reticle extends Component {

    render() {

        const item = this.props.item;
        const editAreaInfo = this.props.stores.editReticleStore.editAreaInfo;
        const arcs = getArcDataFromDivisionCount({ divisions: item.divisions });

        return (
            <svg className='reticle' width='100%' height='100%' style={{ transform: "rotate(" + item.rotation + "deg)" }}>
                {item.divisions === 0
                    ? <circle stroke={'red'} cx="50%" cy="50%" r={item.radius} strokeWidth={item.thickness} fill="none" />
                    : arcs.map((arcData) => { return <Arc key={arcData.id}
                                                          thickness={item.thickness}
                                                          radius={item.radius}
                                                          center={{ x: editAreaInfo.point.x, y: editAreaInfo.point.y} }
                                                          start={arcData.start}
                                                          end={arcData.end - item.spacing}></Arc> })
                }
            </svg>
        );
    }

}