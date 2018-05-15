import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class Arc extends Component {

    render() {
        return (
            <path d="M150 0 L75 200 L225 200 Z" />
        );
    }

}