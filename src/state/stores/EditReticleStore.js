import { action, computed, observable } from 'mobx';
import { EditControlModel } from '../models/EditControlModel';
import { ReticleModel } from '../models/ReticleModel';

import { getEditAreaInfo } from '../../utils/reticleUtils';

export class EditReticleStore {

    @observable isDrawing = false;
    @observable editAreaInfo = null;

    constructor(stores) {
        this.stores = stores;
    }

    @action updateEditArea(payload) {
        this.editAreaInfo = getEditAreaInfo(payload);
    }

}