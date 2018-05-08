import { action, computed, observable} from 'mobx';
import { ReticleModel } from '../models/ReticleModel';

import { getEditAreaInfo } from '../../utils/reticleUtils';

export class ReticlesStore {

  @observable items = [];
  @observable isDrawing = false;
  @observable reticleInFocus = null;
  @observable lastReticleInFocus = null;
  @observable editAreaInfo = null;

  constructor(stores) {
    this.stores = stores;
  }

  @action add(payload) {
    this.reticleInFocus = new ReticleModel(payload);
    this.lastReticleInFocus = this.reticleInFocus;
    this.items.push(this.reticleInFocus);
  }

  @action.bound updateReticleInFocus(payload) {
    this.reticleInFocus = this.items.find(item => item.id === payload.id);
  }

  @action updateEditArea(payload) {
    this.editAreaInfo = getEditAreaInfo(payload);
  }

  getReticleById(id) {
    return computed(() => {
      return this.items.find(el => el.id === id);
    }).get();
  }

}