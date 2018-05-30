import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class Graphic extends Component {

    render() {

        const gfxId = this.props.gfxId;
        console.log(this.props);

        return (
            <use href={gfxId}
                 x={this.props.angle}
                 y={this.props.angle}
                 width='100px'
                 height='100px' />
        );
    }

}