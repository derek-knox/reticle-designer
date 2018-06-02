import React, {Component} from 'react';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class GraphicWidget extends Component {

    @action.bound onClickX(e) {
        this.props.stores.editReticleStore.isGridControlOpen = true;
    }

    render() {
        return (
            <div onClick={this.onClickX}>
                Click Me
            </div>
        );
    }

}