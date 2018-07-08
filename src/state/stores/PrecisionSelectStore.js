import { action, observable } from 'mobx';

export class PrecisionSelectStore {

    @observable isVisible = false;
    @observable position = { x: 0, y: 0 };

    constructor(stores) {
        this.stores = stores;
    }

    @action updatePanel(payload) {
        this.isVisible = payload.isVisible;
        this.position = payload.position || { x: 0, y: 0 };
    }
}