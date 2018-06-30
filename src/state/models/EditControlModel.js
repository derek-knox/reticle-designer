import { observable } from 'mobx';
import { uniqueId } from 'lodash';

export class EditControlModel {

    static Type = {
        Range: 'range',
        DualRange: 'dual-range',
        Grid: 'grid',
        ToggleRange: 'toggle-range',
    }

    static defaultSettings = { reticleProp: null, val: 0, min: 0, max: 100 };

    @observable id;
    @observable label;
    @observable type;
    @observable settings;

    constructor(payload) {
        this.id = uniqueId();
        this.label = payload.label;
        this.type = payload.type;
        this.settings = Object.assign({}, EditControlModel.defaultSettings, payload.settings);
    }

}