import React, {Component} from 'react';
import { action } from 'mobx';
import {inject, observer} from 'mobx-react';
import domtoimage from "dom-to-image";
import FileSaver from 'file-saver';

import Button from "@material-ui/core/Button";

import LayerListItem from './LayerListItem';

@inject('stores')
@observer
export default class LayersContainer extends Component {

    @action.bound onClickClone(e) {
        this.props.stores.reticlesStore.clone();
    }

    @action.bound onClickSnapshot(e) {
        domtoimage.toBlob(document.getElementById('reticles-snapshot-target'), { quality: 1, bgcolor: '#333' })
            .then(function (blob) {
                FileSaver.saveAs(blob, 'fui-reticles-' + Date.now() + '.png');
            });
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