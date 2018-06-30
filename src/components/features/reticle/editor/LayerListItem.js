import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';
import classnames from 'classnames';

@inject('stores')
@observer
export default class LayerListItem extends Component {

    @action.bound onClickDeleteLayer(e, payload) {
        this.props.stores.reticlesStore.delete(payload);
        e.stopPropagation();
    }

    @action.bound onMouseOverLayer(e) {
        this.props.stores.editReticleStore.updatePositionHelperReticleInFocus(this.props.item);
    }

    @action.bound onClickLayer(e, payload) {
        this.props.stores.reticlesStore.updateReticleInFocus({ id: payload.id});
    }

    render() {

        const item = this.props.item;
        const isFocused = this.props.stores.reticlesStore.reticleInFocus.id === item.id;

        return (
            <div className={classnames('reticle-editor-layer-list-item', {'is-selected': isFocused})}
                 onMouseOver={this.onMouseOverLayer}
                 onClick={(e) => this.onClickLayer(e, item)}>
                {item.label}
                {isFocused
                    ? <div className='reticle-editor-layer-list-item-button'
                           onClick={(e) => this.onClickDeleteLayer(e, item)}>x</div>
                    : null
                }
            </div>
        );
    }

}