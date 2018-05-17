import { action, computed, observable } from 'mobx';
import { EditControlModel } from '../models/EditControlModel';
import { ReticleModel } from '../models/ReticleModel';

import { getEditAreaInfo } from '../../utils/reticleUtils';

export class EditReticleStore {

    @observable items = [
        new EditControlModel({ id: 0, label: 'Radius', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Radius, min: 1, max: 1000 } }),
        new EditControlModel({ id: 1, label: 'Thickness', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Thickness, min: 1, max: 150 } }),
        new EditControlModel({ id: 2, label: 'Divisions', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Divisions, min: 0, max: 180 } }),
        new EditControlModel({ id: 3, label: 'Spacing', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Spacing, min: 1, max: 359 } }),
        new EditControlModel({ id: 4, label: 'Rotation', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Rotation, min: 1, max: 360 } }),
        new EditControlModel({ id: 5, label: 'Graphic', type: EditControlModel.Type.List, settings: { reticleProp: ReticleModel.SettingType.Graphic, items: [] } }),
        new EditControlModel({ id: 6, label: 'Direction', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Direction, min: 1, max: 360 } }),
        new EditControlModel({ id: 7, label: 'Scale', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Scale, min: 1, max: 5 } })
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