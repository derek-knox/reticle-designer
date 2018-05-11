import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import EditControlWidget from './EditControlWidget';

@inject('stores')
@observer
export default class EditControl extends Component {

    render() {

        const item = this.props.item;

        return (
            <div className='reticle-editor-control-row'>
                
                <div className='reticle-editor-control-label'>
                    {item.name}
                </div>

                <EditControlWidget item={item}></EditControlWidget>
                
            </div>
        );
    }

}