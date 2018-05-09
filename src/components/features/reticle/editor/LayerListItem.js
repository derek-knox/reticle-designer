import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class LayerListItem extends Component {

    @action.bound onClickLayer(e, payload) {
        this.props.stores.reticlesStore.updateReticleInFocus({ id: payload.id})
    }

    render() {

        const item = this.props.item;

        return (
            <div className={'reticle-editor-layer-list-item ' + (this.props.stores.reticlesStore.reticleInFocus.id === item.id ? 'is-layer-selected' : '')}
                 onClick={(e) => this.onClickLayer(e, item)}>
                {item.name}
            </div>
        );
    }

}