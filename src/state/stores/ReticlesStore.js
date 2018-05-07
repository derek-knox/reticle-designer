import { action, computed, observable} from 'mobx';
import { ReticleModel } from '../models/ReticleModel';

export class ReticlesStore {

  @observable isDrawing = false;
  @observable reticleInFocus = null;
  @observable lastReticleInFocus = null;
  @observable stageCenterPoint = null;
  @observable items = [];

  constructor(stores) {
    this.stores = stores;
  }

  @action add(payload) {
    this.reticleInFocus = new ReticleModel(payload);
    this.lastReticleInFocus = this.reticleInFocus;
    this.items.push(this.reticleInFocus);
  }

  getReticleById(id) {
    return computed(() => {
      return this.items.find(el => el.id === id);
    }).get();
  }

}