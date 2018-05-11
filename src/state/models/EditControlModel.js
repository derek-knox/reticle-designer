import { observable } from 'mobx';
import { uniqueId } from 'lodash';

export class EditControlModel {

    static Type = {
        Range: 'range',
        List: 'list',
    }

    @observable id;
    @observable label;
    @observable type;
    @observable settings = { reticleProp: null, min: 0, max: 100 };

    constructor(payload) {
        this.id = uniqueId();
        this.label = payload.label;
        this.type = payload.type;
        this.settings = payload.settings || this.settings;
    }

}