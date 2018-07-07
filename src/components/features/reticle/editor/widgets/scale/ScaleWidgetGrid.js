import React, { Component } from 'react';
import { action, observe, observable } from "mobx";
import { inject, observer } from 'mobx-react';

import classnames from "classnames";

@inject('stores')
@observer

export default class ScaleWidgetGrid extends Component {

    @observable gridData = { cellSizeInPx: 0, items: [] };
    @observable initialScale = this.props.reticleInFocus.scale.settings.val;
    @observable scaleFeedbackPosition = { x: 0, y: 0 };
    unobserve = null;

    constructor(props) {
        super(props);
        this.refEl = React.createRef();
        this.unobserve = observe(this.props.stores.reticlesStore, 'reticleInFocus', this.onChangeReticleInFocus);
    }

    componentDidMount() {
        this.initGridData();
    }

    componentDidUpdate() {
        if (this.props.isReset) {
            this.reset();
        }
    }

    componentWillUnmount() {
        this.unobserve();
    }

    initGridData() {
        const settings = this.props.reticleInFocus.scale.settings;
        const size = settings.max/settings.step;
        let x = settings.min;
        let y = settings.min;
        for(var i = 0; i < size; i++) {
            for(var j = 0; j < size; j++) {
                this.gridData.items.push({
                    x: parseFloat(x).toFixed(1).replace('0.', '.').replace('.0', ''),
                    y: parseFloat(y).toFixed(1).replace('0.', '.').replace('.0', '')
                });
                x += settings.step;
            }
            x = settings.min;
            y += settings.step;
        }

        this.gridData.cellSizeInPx = (this.refEl.current.offsetWidth/size) + 'px';
    }

    reset() {
        this.props.reticleInFocus.scale.settings.val = this.initialScale;
    }

    onMouseOverScaleTile(e, payload) {

        
        // Prevent quick hover after selection causing scale to update
        if (this.props.stores.editReticleStore.isGridControlOpen) {
            this.props.reticleInFocus.scale.settings.val = payload;
            this.scaleFeedbackPosition = { x: e.currentTarget.offsetLeft - 46, y: e.currentTarget.offsetTop - 90 };
        }
    }

    onClickScaleTile(e, payload) {
        this.props.reticleInFocus.scale.settings.val = payload;
        this.initialScale = payload;
        this.props.stores.editReticleStore.isGridControlOpen = false;
    }

    @action.bound onChangeReticleInFocus(payload) {
        payload.oldValue.scale.settings.val = this.initialScale;
        this.initialScale = payload.newValue.scale.settings.val;
    }

    render() {

        const reticleInFocus = this.props.stores.reticlesStore.reticleInFocus;
        const reticleInFocusScaleVal = reticleInFocus.scale.settings.val;

        return (
            <div className="widget-helper-grid widget-helper-grid-scale"
                 ref={this.refEl}>
                {this.gridData.items.map((item, idx) => {
                    return (
                        <div key={idx}
                            className={classnames('widget-helper-grid-scale-cell',
                                { 'is-initially-selected': this.initialScale.x === item.x && this.initialScale.y === item.y },
                                { 'is-selected': reticleInFocusScaleVal.x === item.x && reticleInFocusScaleVal.y === item.y },
                                { 'is-uniform-scale-helper': idx === 84 || idx === 189 || idx === 294 })
                            }
                            onMouseOver={(e) => this.onMouseOverScaleTile(e, item)}
                            onClick={(e) => this.onClickScaleTile(e, item)}
                            style={{ width: this.gridData.cellSizeInPx, height: this.gridData.cellSizeInPx }}>
                            <div className='widget-helper-grid-scale-cell-label'>-</div>
                        </div>
                    );
                })
                }
                <div className='widget-helper-grid-scale-feedback'
                     style={{ transform: 'translate(' + this.scaleFeedbackPosition.x + 'px,' + this.scaleFeedbackPosition.y + 'px)' }}>
                    {reticleInFocusScaleVal.x}<span className='scale-widget-divider'>x</span>{reticleInFocusScaleVal.y}
                </div>
            </div>
        );
    }

}