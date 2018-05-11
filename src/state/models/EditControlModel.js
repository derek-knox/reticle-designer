import { observable } from 'mobx';
import { uniqueId } from 'lodash';

export class EditControlModel {

    static Type = {
        Range: 'range',
        List: 'list',
    }

    @observable id;
    @observable name;
    @observable type;
    @observable settings = { min: 0, max: 100 };

    constructor(payload) {
        this.id = uniqueId();
        this.name = payload.name;
        this.type = payload.type;
        this.settings = payload.settings || this.settings;
    }

}