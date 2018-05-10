import React, {Component} from 'react';
import { action } from 'mobx';
import {inject, observer} from 'mobx-react';

import Button from 'material-ui/Button';

import LayerListItem from './LayerListItem';

@inject('stores')
@observer
export default class LayersPanel extends Component {

    @action.bound onClickClone(e) {
        this.props.stores.reticlesStore.clone();
    }

    render() {
        return (
            <div className="container reticle-editor-layers-container">
                <div className="wrapper">
                    <div className="content-v">
                
                    <div className='reticle-editor-heading'>Layers</div>
                    
                    <div className="reticle-editor-layers">
                        <div className="reticle-editor-layers-items">
                            {this.props.stores.reticlesStore.items.map(item => {
                                return <LayerListItem key={item.id} item={item} />
                            })}
                        </div>
                        <Button className="reticle-editor-layers-clone-button"
                                onClick={this.onClickClone}>Clone {this.props.stores.reticlesStore.reticleInFocus.name}</Button>
                    </div>
                    
                    </div>
                </div>
            </div>
        );
    }

}