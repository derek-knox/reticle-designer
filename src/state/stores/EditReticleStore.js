import { action, computed, observable } from 'mobx';
import { ReticleModel } from '../models/ReticleModel';

import { getEditAreaInfo } from '../../utils/reticleUtils';

export class EditReticleStore {

    @observable items = [1, 2, 3];
    @observable isDrawing = false;
    @observable editAreaInfo = null;

    constructor(stores) {
        this.stores = stores;
    }

    @action updateEditArea(payload) {
        this.editAreaInfo = getEditAreaInfo(payload);
    }

    getEditControlById(id) {
        return computed(() => {
            return this.items.find(el => el.id === id);
        }).get();
    }

}