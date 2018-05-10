import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';

import EditControl from './EditControl';

@inject('stores')
@observer
export default class EditLayerContainer extends Component {

    @action.bound onClickX(e) {
        
    }

    render() {
        return (
            <div className="container reticle-editor-edit-container">
                <div className="wrapper">
                    <div className="content-v">
                
                        <div className='reticle-editor-heading'>{this.props.stores.reticlesStore.reticleInFocus.name}</div>

                        <div className="reticle-editor-layer-controls">
                            {this.props.stores.editReticleStore.items.map(item =>
                                <EditControl key={item}></EditControl>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}