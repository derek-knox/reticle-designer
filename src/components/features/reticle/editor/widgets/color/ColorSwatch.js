import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import classnames from 'classnames';

@inject('stores')
@observer
export default class ColorSwatch extends Component {

    render() {
        return (
            <div className={classnames("color-item",
                    { 'is-initially-selected': this.props.isInitiallySelected },
                    { 'is-selected': this.props.isSelected })}
                 onClick={this.props.onComponentClick}
                 onMouseOver={this.props.onComponentMouseOver}>
                <div className='color-swatch' style={{ backgroundColor: this.props.color }}></div>
            </div>
        );
    }

}