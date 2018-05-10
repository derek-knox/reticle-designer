import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class EditControl extends Component {

    render() {
        return (
            <div className='reticle-editor-edit-control'>
                {this.props.name}
            </div>
        );
    }

}