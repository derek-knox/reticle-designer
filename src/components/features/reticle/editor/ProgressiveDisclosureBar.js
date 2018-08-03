import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';

import classnames from 'classnames';

import ProgressiveDisclosureGoal from './ProgressiveDisclosureGoal';
import { MuiThemeProvider } from '../../../../../node_modules/material-ui';

@inject('stores')
@observer
export default class ProgressiveDisclosureBar extends Component {
    
    goalWidth = 0;

    constructor(props) {
        super(props);
        this.refElBarGoals = React.createRef();
    }

    componentDidMount() {
        this.updateGoalWidth();
    }

    @action.bound updateGoalWidth() {
        this.goalWidth = this.refElBarGoals.current.offsetWidth;
    }
    
    @action.bound onClickToggleVisibility() {
        this.props.stores.editReticleStore.isMinimized = !this.props.stores.editReticleStore.isMinimized;
    }
    
    render() {
        
        const goalCount = this.props.stores.progressiveDisclosureStore.goals.length;
        const goalList = this.props.stores.progressiveDisclosureStore.goals;
        const currentGoalIndex = goalList.indexOf(this.props.stores.progressiveDisclosureStore.getCurrentGoal());
        const offsetX = -(this.goalWidth * currentGoalIndex);

        return (
            <div className='progressive-disclosure-bar'>
                <div className={classnames('progressive-disclosure-bar-goals', {
                                           'is-hidden': this.props.stores.editReticleStore.isMinimized
                                })}
                     ref={this.refElBarGoals}>
                    <div className="progressive-disclosure-bar-goals-list"
                         style={{ transform: 'translateX(' + offsetX + 'px)' }}>
                        {goalList.map((goal) => {
                                return <ProgressiveDisclosureGoal key={goal.id} goal={goal} goalCount={goalCount} width={this.goalWidth}></ProgressiveDisclosureGoal>
                            })
                        }
                    </div>
                </div>
                <div className="progressive-disclosure-bar-divider"></div>
                <div className='progressive-disclosure-bar-visibility' onClick={this.onClickToggleVisibility}>
                    {this.props.stores.editReticleStore.isMinimized ? '+' : '-'}
                </div>
            </div>
        );
    }

}