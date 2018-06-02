import { action, observable } from 'mobx';

import { getEditAreaInfo } from '../../utils/reticleUtils';

export class EditReticleStore {

    @observable isDrawing = false;
    @observable isGridControlOpen = false;
    @observable editAreaInfo = null;

    constructor(stores) {
        this.stores = stores;
    }

    @action updateEditArea(payload) {
        this.editAreaInfo = getEditAreaInfo(payload);
    }

}