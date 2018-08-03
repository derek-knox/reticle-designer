import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
export default class ProgressiveDisclosureGoal extends Component {

    render() {
        return (
            <div className='progressive-disclosure-bar-goal'
                 style={ { width: this.props.width + 'px' } }>
                <span>{this.props.goal.id + '/' + this.props.goalCount}:</span> <span>{this.props.goal.message}</span>
            </div>
        );
    }

}