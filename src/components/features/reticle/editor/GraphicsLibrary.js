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
                    <g id="gfx – 1"><use href="#gfx-bg" /><path d="M193.5,28.25h50v50h-50Z" transform="translate(-168 -2.75)" /></g>
                    <g id="gfx – 2"><use href="#gfx-bg" /><g transform="translate(25 25)"><circle cx="25" cy="25" r="25" /><circle cx="25" cy="25" r="24.5" /></g></g>
                    <g id="gfx – 3"><use href="#gfx-bg" /><path d="M535,75.292l25-25v25l25-25" transform="translate(-509.5 -12.792)" /></g>
                    <g id="gfx – 4"><use href="#gfx-bg" /><path d="M694.833,23.333h30" transform="translate(-659.333 27.167)" /><path d="M694.833,23.333h50" transform="translate(-669.333 7.167)" /><path d="M694.833,23.333h10" transform="translate(-649.333 47.167)" /><path d="M694.833,23.333h40" transform="translate(-664.333 17.167)" /><path d="M694.833,23.333h20" transform="translate(-654.333 37.167)" /></g>
                </defs>

            </svg>
        );
    }

}