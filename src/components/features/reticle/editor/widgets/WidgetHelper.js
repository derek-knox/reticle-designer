import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class WidgetHelper extends Component {

    @action.bound onClickX(e) {
        this.props.stores.editReticleStore.isGridControlOpen = false;
    }

    render() {
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