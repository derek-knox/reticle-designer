import { action, observable } from 'mobx';
import domtoimage from "../../vendor-forks/dom-to-image";
import FileSaver from "file-saver";

import { getEditAreaInfo } from '../../utils/reticleUtils';

import { ReticleModel } from "../models/ReticleModel";

export class EditReticleStore {

    @observable isDrawing = false;
    @observable isSnapshotInProcess = false;
    @observable isGridControlOpen = false;

    @observable positionHelperReticleInFocus = null;

    @observable graphics = [];
    @observable editAreaInfo = null;

    constructor(stores) {
        this.stores = stores;
    }

    @action updatePositionHelperReticleInFocus(payload) {
        this.positionHelperReticleInFocus = new ReticleModel(payload);
        this.positionHelperReticleInFocus.color.settings.val = this.stores.colorStore.getHelperColor();
    }

    @action updateGraphics(payload) {
        this.graphics = payload;
    }

    @action updateEditArea(payload) {
        this.editAreaInfo = getEditAreaInfo(payload);
    }

    @action takeSnapshot() {
        this.isSnapshotInProcess = true;
        const target = document.getElementById("reticles-snapshot-target"),
              targetRect = target.getBoundingClientRect();
        domtoimage.toBlob(target, { quality: 1, bgcolor: '#333', width: targetRect.width, height: targetRect.height })
            .then(this.onShapshotProcessed);
    }

    @action.bound onShapshotProcessed(payload) {
        FileSaver.saveAs(payload, "fui-reticles-" + Date.now() + ".png");
        this.isSnapshotInProcess = false;
    }

}