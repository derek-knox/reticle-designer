import React, {Component} from 'react';
import { action } from 'mobx';
import {inject, observer} from 'mobx-react';
import keydown from 'react-keydown';
import classnames from 'classnames';

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
        const isDisabled = this.props.isLocked || !this.props.isVisible

        return (
            <div className={classnames('reticle-editor-control-row',
                                      {'is-selected': this.props.controlInFocus.id === item.id,
                                       'has-divider': this.props.hasDivider,
                                       'is-disabled': isDisabled})}
                 ref={this.refEl}
                 onMouseDown={this.props.isVisible ? this.onMouseDownControl : null}>

                {isDisabled
                    ? <div className='is-disabled-blocker'></div>
                    : null
                }
                
                <div className='reticle-editor-control-label'>
                    {this.props.isLocked ? 'Locked' : item.label}
                </div>

                <EditControlWidget item={item} {...this.props}></EditControlWidget>
                
            </div>
        );
    }

}