import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class ReticleWithGraphic extends Component {

    render() {

        const gfxId = this.props.gfxId;

        return (
            <use href={gfxId} />
        );
    }

}