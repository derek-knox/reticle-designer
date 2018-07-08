import React, {Component} from 'react';
import { action, observable } from 'mobx';
import {inject, observer} from 'mobx-react';

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
        // const rect = this.refEl.getBoundingClientRect();
        console.dir(this.refEl);
        let point = this.props.stores.precisionSelectStore.position;
        // point.x -= point.x - rect.width/2;
        // point.y -= point.y - 50;
        return {
            transform: 'translate(' + point.x + 'px, ' + point.y + 'px)'
        };
    }

    render() {
        return (
            <div className='precision-select-container'
                 onMouseLeave={this.onMouseLeave}
                 ref={this.refEl}
                 style={this.getStyle()}>
                <div className='precision-select-header'>
                    Precision Select
                </div>
                <div className='precision-select-list'>
                    ...
                </div>
            </div>
        );
    }

}