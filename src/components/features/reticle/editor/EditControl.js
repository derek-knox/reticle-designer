import React, {Component} from 'react';
import { action } from 'mobx';
import {inject, observer} from 'mobx-react';
import keydown from 'react-keydown';

import EditControlWidget from './EditControlWidget';

@inject('stores')
@observer
@keydown('up', 'right', 'down', 'left', 'shift+up', 'shift+right', 'shift+down', 'shift+left')
export default class EditControl extends Component {

    constructor(props) {
        super(props);
        this.refEl = React.createRef();
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    @action.bound onMouseDownControl(e) {
        this.props.stores.reticlesStore.reticleInFocus.updateControlInFocus(this.props.item);
    }

    render() {

        const item = this.props.item;

        return (
            <div className={'reticle-editor-control-row ' + (this.props.controlInFocus.id === item.id ? 'is-selected' : '')}
                 ref={this.refEl}
                 onMouseDown={this.onMouseDownControl}>
                
                <div className='reticle-editor-control-label'>
                    {item.label}
                </div>

                <EditControlWidget item={item} {...this.props}></EditControlWidget>
                
            </div>
        );
    }

}