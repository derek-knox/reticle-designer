import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import classnames from "classnames";

@inject('stores')
@observer
export default class MorphToReticle extends Component {

    originalRect = null;

    constructor(props) {
        super(props);
        this.refEl = React.createRef();
    }

    getStyle(payload) {

        if(payload) {

            if(!this.originalRect) { this.originalRect = this.refEl.current.getBoundingClientRect() }

            const radius = this.props.stores.reticlesStore.reticleInFocus.radius.settings.val;
            const size = radius * 2 + 'px';

            return ({
                width: size,
                height: size,
                borderRadius: radius + 'px'
            });
        } else {

            if(!this.originalRect) { return; }

            return ({
                width: this.originalRect.width - 10 + 'px',
                height: this.originalRect.height - 10 + 'px',
            });
        }
    }

    render() {

        const animate = this.props.startAnimation;

        return (
            <div ref={this.refEl}
                 className={classnames('morph-to-reticle', { 'animate': animate})}
                 style={this.getStyle(animate)}>
                <span className='copy-mirror'>Click & Drag</span>
            </div>
        );
    }

}