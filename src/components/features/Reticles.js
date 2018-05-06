import React, {Component} from 'react';
import { action, observable } from 'mobx';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class Reticles extends Component {

    @action.bound onMouseDown(e) {
        console.log('hit');
        this.props.stores.reticlesStore.isDrawing = true;
    }
    
    @action.bound onMouseMove(e) {
        if(this.props.stores.reticlesStore.isDrawing)
            console.log('hit move');
    }
    
    @action.bound onMouseUp(e) {
        console.log('hit up');
        this.props.stores.reticlesStore.isDrawing = false;
    }

    render() {
        return (
            <div className='reticles-container'>
                <div className='reticles-drag-target'
                     onMouseDown={(e) => this.onMouseDown(e)}
                     onMouseMove={(e) => this.onMouseMove(e)}
                     onMouseUp={(e) => this.onMouseUp(e)}>

                </div>
                <div className='reticles-directions'>
                    { this.props.stores.reticlesStore.isDrawing
                        ? <span>Let Go Whenever</span>
                        : <span>Click & Drag</span>
                    }
                </div>
            </div>
        );
    }

}