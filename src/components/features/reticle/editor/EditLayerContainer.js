import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import EditControl from './EditControl';

@inject('stores')
@observer
export default class EditLayerContainer extends Component {

    render() {
        return (
            <div className="container reticle-editor-edit-container">
                <div className="wrapper">
                    <div className="content-v">
                
                        <div className='reticle-editor-heading'>{this.props.stores.reticlesStore.reticleInFocus.label}</div>

                        <div className="reticle-editor-layer-controls">
                            {this.props.stores.editReticleStore.items.map(item =>
                                <EditControl key={item.id} item={item}></EditControl>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}