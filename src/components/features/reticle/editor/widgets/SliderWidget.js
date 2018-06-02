import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class SliderWidget extends Component {

    render() {
        return <div>TODO put slider in here</div>;
    }

}