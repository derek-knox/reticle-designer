import React, {Component} from 'react';
import { action, observable } from 'mobx';
import {inject, observer} from 'mobx-react';
import classnames from "classnames";

import PrecisionSelectListItem from './PrecisionSelectListItem';

@inject('stores')
@observer
export default class PrecisionSelect extends Component {

    @observable refEl = null;

    constructor(props) {
        super(props);
        this.refEl = React.createRef();
    }

    @action.bound onMouseLeave(e) {
        this.props.stores.precisionSelectStore.updatePanel({isVisible: false});
    }

    getStyle() {
        let point;
        const rect = this.refEl.current ? this.refEl.current.getBoundingClientRect() : { width: 0, height: 0 };
        if(this.props.isFocused) {
            point = { x: this.props.stores.precisionSelectStore.position.x, y: this.props.stores.precisionSelectStore.position.y };
            point.x -= rect.width/2;
            point.y -= 80;
        } else {
            const editAreaInfo = this.props.stores.editReticleStore.editAreaInfo;
            const x = editAreaInfo ? (editAreaInfo.point.x - (rect.width / 2)) : 0;
            const y = editAreaInfo ? (editAreaInfo.point.y - (rect.height / 2)) : 0;
            point = { x, y };
        }

        return {
            transform: 'translate(' + point.x + 'px, ' + point.y + 'px)'
        };
    }

    render() {

        const matches = this.props.stores.precisionSelectStore.matches;

        return (
            <div className={classnames('precision-select-container', { 'is-focused': this.props.isFocused })}
                 ref={this.refEl}
                 onMouseLeave={this.onMouseLeave}
                 style={this.getStyle()}>
                <div className='precision-select-header'>
                    Precision Select
                </div>
                <div className='precision-select-list'>
                    {matches.map(item => <PrecisionSelectListItem key={item.id} item={item}></PrecisionSelectListItem>)}
                </div>
            </div>
        );
    }

}