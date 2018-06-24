import React, {Component} from 'react';
import { action } from 'mobx';
import {inject, observer} from 'mobx-react';

import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';

import Button from "@material-ui/core/Button";

import LayerListItem from './LayerListItem';

@inject('stores')
@observer
export default class LayersContainer extends Component {

    @action.bound onClickClone(e) {
        this.props.stores.reticlesStore.clone();
    }

    @action.bound onClickSnapshot(e) {
        this.props.stores.editReticleStore.takeSnapshot();
    }

    @action.bound onSortEnd(payload) {
        this.props.stores.reticlesStore.items = arrayMove(this.props.stores.reticlesStore.items, payload.oldIndex, payload.newIndex);
    }

    render() {
        return (
            <div className="container reticle-editor-layers-container">
                <div className="wrapper">
                    <div className="content-v">
                
                        <div className='reticle-editor-heading'>Layers</div>
                        
                        <div className="reticle-editor-layers">
                            
                            <SortableList items={this.props.stores.reticlesStore.items}
                                          useDragHandle={true}
                                          onSortEnd={this.onSortEnd}
                                          lockAxis='y'
                                          transitionDuration={160}
                                          lockToContainerEdges={true}
                                          helperClass='dragging-layer' />

                            <Button className="reticle-editor-layers-button"
                                    onClick={this.onClickClone}>Clone {this.props.stores.reticlesStore.reticleInFocus.label}</Button>
                            <Button className="reticle-editor-layers-button"
                                    onClick={this.onClickSnapshot}>Snapshot</Button>
                        </div>
                    
                    </div>
                </div>
            </div>
        );
    }
}

const DragHandle = SortableHandle(() => <div className='reticle-editor-layer-list-item-draggable'>&#8214;</div>);

const SortableItem = SortableElement(({ value }) => (
    <div className='reticle-editor-layer-list-item-draggable-container'>
        <DragHandle />
        <LayerListItem item={value} />
    </div>
));

const SortableList = SortableContainer(({ items }) => {
    return (
        <div className="reticle-editor-layers-items">
            {items.map((item, index) => {
                return <SortableItem key={item.id} index={index} value={item} />;
            })}
        </div>
    );
});