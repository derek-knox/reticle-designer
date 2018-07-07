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

        const count = this.props.stores.progressiveDisclosureStore.goals.length;
        const goal = this.props.stores.progressiveDisclosureStore.getCurrentGoal();

        return (
            <div className='progressive-disclosure-bar'>
                <div className='progressive-disclosure-bar-goals'>
                    <span>{goal.id + '/' + count}:</span> <span>{goal.message}</span>
                </div>
                <div className='progressive-disclosure-bar-visibility' onClick={this.onClickToggleVisibility}>
                    -
                </div>
            </div>
        );
    }

}