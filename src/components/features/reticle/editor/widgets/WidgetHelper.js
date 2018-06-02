import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';

import {EditControlModel} from '../../../../../state/models/EditControlModel';

@inject('stores')
@observer
export default class WidgetHelper extends Component {

    componentDidUpdate() {
        if(this.props.controlInFocus.type !== EditControlModel.Type.Grid && this.props.stores.editReticleStore.isGridControlOpen) {
            this.props.stores.editReticleStore.isGridControlOpen = false;
        }
    }

    @action.bound onClickX(e) {
        this.props.stores.editReticleStore.isGridControlOpen = false;
    }

    render() {

        console.log(this.props.controlInFocus);

        return (
            <div className="wrapper">
                <div className="content-v">
                    <div className="widget-helper">
                        <div onClick={this.onClickX}>
                            Close X
                        </div>
                        <hr/>
                        Hello
                    </div>
                </div>
            </div>
        );
    }

}