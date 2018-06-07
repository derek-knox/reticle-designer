import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';
import classnames from 'classnames';

@inject('stores')
@observer
export default class LayerListItem extends Component {

    @action.bound onClickLayer(e, payload) {
        this.props.stores.reticlesStore.updateReticleInFocus({ id: payload.id})
    }

    render() {

        const item = this.props.item;

        return (
            <div className={classnames('reticle-editor-layer-list-item', {'is-selected': this.props.stores.reticlesStore.reticleInFocus.id === item.id})}
                 onClick={(e) => this.onClickLayer(e, item)}>
                {item.label}
            </div>
        );
    }

}