import { action, computed, observable } from 'mobx';
import { EditControlModel } from '../models/EditControlModel';

import { getEditAreaInfo } from '../../utils/reticleUtils';

export class EditReticleStore {

    @observable items = [
        new EditControlModel({ name: 'Radius', type: EditControlModel.Type.Range, settings: { reticleProp: 'radius', min: 1, max: 500 } }),
        new EditControlModel({ name: 'Thickness', type: EditControlModel.Type.Range, settings: { reticleProp: 'thickness', min: 1, max: 50 } }),
        new EditControlModel({ name: 'Divisions', type: EditControlModel.Type.Range, settings: { reticleProp: 'divisions', min: 0, max: 360 } }),
        new EditControlModel({ name: 'Spacing', type: EditControlModel.Type.Range, settings: { reticleProp: 'spacing', min: 1, max: 359 } }),
        new EditControlModel({ name: 'Rotation', type: EditControlModel.Type.Range, settings: { reticleProp: 'rotation', min: 1, max: 360 } }),
        new EditControlModel({ name: 'Graphic', type: EditControlModel.Type.List, settings: { reticleProp: 'graphic', items: [] } }),
        new EditControlModel({ name: 'Direction', type: EditControlModel.Type.Range, settings: { reticleProp: 'direction', min: 1, max: 360 } }),
        new EditControlModel({ name: 'Scale', type: EditControlModel.Type.Range, settings: { reticleProp: 'scale', min: 1, max: 5 } })
    ];
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