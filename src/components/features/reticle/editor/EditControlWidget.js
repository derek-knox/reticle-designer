import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
export default class EditControlWidget extends Component {

    render() {

        const item = this.props.item;

        return (
            <div className="reticle-editor-control-widget">
                {item.type}
            </div>
        );
    }

}