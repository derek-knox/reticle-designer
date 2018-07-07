import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';

import classnames from 'classnames';

@inject('stores')
@observer
export default class ProgressiveDisclosureBar extends Component {

    @action.bound onClickToggleVisibility(e) {
        this.props.stores.editReticleStore.isMinimized = !this.props.stores.editReticleStore.isMinimized;
    }

    render() {

        const count = this.props.stores.progressiveDisclosureStore.goals.length;
        const goal = this.props.stores.progressiveDisclosureStore.getCurrentGoal();

        return (
            <div className='progressive-disclosure-bar'>
                <div className={classnames('progressive-disclosure-bar-goals', {
                                           'is-hidden': this.props.stores.editReticleStore.isMinimized
                                })}>
                    <span>{goal.id + '/' + count}:</span> <span>{goal.message}</span>
                </div>
                <div className="progressive-disclosure-bar-divider"></div>
                <div className='progressive-disclosure-bar-visibility' onClick={this.onClickToggleVisibility}>
                    {this.props.stores.editReticleStore.isMinimized ? '+' : '-'}
                </div>
            </div>
        );
    }

}