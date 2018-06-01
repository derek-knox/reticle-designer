import React, {Component} from 'react';

export default class GraphicsLibrary extends Component {

    render() {
        return (
            <svg className='graphics-library' version="1.1" xmlns="http://www.w3.org/2000/svg">

                <defs>
                    <rect id='gfx-1' x="0" y="0" width="50" height="20" />
                    <circle id='gfx-2' cx="25" cy="25" r="50" />
                    <polyline id='gfx-3' points="100,100 150,25 150,75 200,0" fill="none" stroke="black" />
                </defs>

            </svg>
        );
    }

}