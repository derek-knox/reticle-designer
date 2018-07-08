import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';

import classnames from "classnames";

@inject('stores')
@observer
export default class componentName extends Component {

    @action.bound onMouseOverLayer(e) {
        this.props.stores.editReticleStore.updatePositionHelperReticleInFocus(this.props.item);
    }

    @action.bound onMouseOutLayer(e) {
        this.props.stores.editReticleStore.updatePositionHelperReticleInFocus(null);
    }

    @action.bound onClickLayer(e, payload) {
        this.props.stores.reticlesStore.updateReticleInFocus({ id: payload.id });
        this.props.stores.editReticleStore.updatePositionHelperReticleInFocus(null);
        this.props.stores.precisionSelectStore.updatePanel({ isVisible: false });
    }

    render() {

        const item = this.props.item;
        const isFocused = this.props.stores.reticlesStore.reticleInFocus.id === item.id;

        return (
            <div className={classnames('precision-select-list-item', {'is-selected': isFocused})}
                 onMouseOut={this.onMouseOutLayer}
                 onMouseOver={this.onMouseOverLayer}
                 onClick={(e) => this.onClickLayer(e, item)}>
                {item.label}
            </div>
        );
    }

}