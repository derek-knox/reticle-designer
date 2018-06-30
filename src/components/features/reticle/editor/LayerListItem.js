import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';
import classnames from 'classnames';

@inject('stores')
@observer
export default class LayerListItem extends Component {

    @action.bound onClickDeleteLayer(e, payload) {
        this.props.stores.reticlesStore.delete(payload);
        this.onMouseOutLayer(e); // Case where two layers exist and 2nd is deleted to ensure out trigger
        e.stopPropagation();
    }

    @action.bound onMouseOverLayer(e) {
        this.props.stores.editReticleStore.updatePositionHelperReticleInFocus(this.props.item);
    }

    @action.bound onMouseOutLayer(e) {
        this.props.stores.editReticleStore.updatePositionHelperReticleInFocus(null);
    }

    @action.bound onClickLayer(e, payload) {
        this.props.stores.reticlesStore.updateReticleInFocus({ id: payload.id});
        this.props.stores.editReticleStore.updatePositionHelperReticleInFocus(null);
    }

    render() {

        const item = this.props.item;
        const isFocused = this.props.stores.reticlesStore.reticleInFocus.id === item.id;

        return (
            <div className={classnames('reticle-editor-layer-list-item', {'is-selected': isFocused})}
                 onMouseOut={this.onMouseOutLayer}
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