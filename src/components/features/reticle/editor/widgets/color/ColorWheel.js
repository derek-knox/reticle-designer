import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class ColorWheel extends Component {

    render() {
        return (
            <div>
                W
            </div>
        );
    }

}