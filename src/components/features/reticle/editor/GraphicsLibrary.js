import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
export default class GraphicsLibrary extends Component {

    constructor(props) {
        super(props);
        this.refEl = React.createRef();
    }

    componentDidMount() {
        this.updateGraphics();
    }

    updateGraphics() {
        const graphics = Array.from(this.refEl.children);
        this.props.stores.editReticleStore.updateGraphics(graphics);
    }

    render() {
        return (
            <svg className='graphics-library' version="1.1" xmlns="http://www.w3.org/2000/svg">

                <defs ref={node => this.refEl = node}>
                    <rect id='gfx-1' x="0" y="0" width="50" height="20" />
                    <circle id='gfx-2' cx="25" cy="25" r="50" />
                    <polyline id='gfx-3' points="100,100 150,25 150,75 200,0" fill="none" stroke="black" />
                </defs>

            </svg>
        );
    }

}