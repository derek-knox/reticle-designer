import React, {Component} from 'react';
import { action } from 'mobx';
import {inject, observer} from 'mobx-react';
import keydown from 'react-keydown';

import EditControlWidget from './EditControlWidget';

@inject('stores')
@observer
@keydown('up', 'right', 'down', 'left', 'shift+up', 'shift+right', 'shift+down', 'shift+left')
export default class EditControl extends Component {

    @action.bound onMouseEnterControl(e, payload) {
        this.props.stores.reticlesStore.reticleInFocus.controlInFocus = payload;
    }

    render() {

        const item = this.props.item;

        return (
            <div className={'reticle-editor-control-row ' + (this.props.controlInFocus.id === item.id ? 'is-selected' : '')}
                 onMouseEnter={(e) => this.onMouseEnterControl(e, item)}>
                
                <div className='reticle-editor-control-label'>
                    {item.label}
                </div>

                <EditControlWidget item={item} {...this.props}></EditControlWidget>
                
            </div>
        );
    }

}