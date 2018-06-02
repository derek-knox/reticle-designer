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

    @action.bound onClickClose(e) {
        this.props.stores.editReticleStore.isGridControlOpen = false;
    }

    render() {

        const reticleInFocus = this.props.reticleInFocus;
        const type = this.props.controlInFocus.type;

        return (
            <div className="wrapper">
                <div className="content-v">
                    <div className="widget-helper">
                        <div onClick={this.onClickClose}>Back</div>
                        <hr/>
                        {this.props.controlInFocus.label}: <span>GFX</span>
                        <div>
                            {}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}