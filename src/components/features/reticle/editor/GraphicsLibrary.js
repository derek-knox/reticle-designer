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

                <defs>
                    <rect id="gfx-bg" width="100" height="100" fill="none" stroke="none" />
                </defs>

                <defs ref={node => this.refEl = node}>
                    <g id="gfx – 1"><use href="#gfx-bg" /><g transform="translate(25 25)"><rect x="0.5" y="0.5" width="49" height="49" /></g></g>
                    <g id="gfx – 2"><use href="#gfx-bg" /><g transform="translate(25 25)"><circle cx="25" cy="25" r="24.5" /></g></g>
                    <g id="gfx – 3"><use href="#gfx-bg" /><path d="M535,75.292l25-25v25l25-25" transform="translate(-509.5 -12.792)" /></g>
                </defs>

            </svg>
        );
    }

}