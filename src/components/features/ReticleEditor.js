import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {inject, observer} from 'mobx-react';

@inject('stores')
@observer
export default class ReticleEditor extends Component {

    refEditor = null;

    constructor(props) {
        super(props);
        this.refEditor = React.createRef();
    }

    render() {

        const x = this.props.stores.reticlesStore.lastReticleInFocus ? this.props.stores.reticlesStore.lastReticleInFocus.radius : 0;
        const y = this.refEditor.current ? -this.refEditor.current.clientHeight/2 : 0;

        return (
            <div className='reticle-editor-container'
                 ref={this.refEditor}
                 style={{ transform: 'translate(' + x + 'px, ' + y + 'px)'} } >
                { this.props.stores.reticlesStore.items.length > 0 && !this.props.stores.reticlesStore.isDrawing
                    ? <span>Editor...</span>
                    : null
                }
            </div>
        );
    }

}