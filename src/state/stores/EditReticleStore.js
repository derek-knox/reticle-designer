import { action, observable } from 'mobx';

import { getEditAreaInfo } from '../../utils/reticleUtils';

export class EditReticleStore {

    @observable isDrawing = false;
    @observable isSnapshotInProcess = false;
    @observable isGridControlOpen = false;
    @observable graphics = [];
    @observable editAreaInfo = null;

    constructor(stores) {
        this.stores = stores;
    }

    @action updateGraphics(payload) {
        this.graphics = payload;
    }

    @action updateEditArea(payload) {
        this.editAreaInfo = getEditAreaInfo(payload);
    }

}