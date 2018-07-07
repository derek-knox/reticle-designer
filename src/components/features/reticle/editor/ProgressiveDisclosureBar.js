import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class ProgressiveDisclosureBar extends Component {

    @action.bound onClickToggleVisibility(e) {
        // create and hook to ProgressiveDisclosureStore
    }

    render() {
        return (
            <div className='progressive-disclosure-bar'>
                <div className='progressive-disclosure-bar-goals'>
                    <span>{1 + '/' + 5}:</span> <span>{ "Use 3+ graphics on a reticle" }</span>
                </div>
                <div className='progressive-disclosure-bar-visibility' onClick={this.onClickToggleVisibility}>
                    -
                </div>
            </div>
        );
    }

}