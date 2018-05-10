import { action, computed, observable} from 'mobx';
import { ReticleModel } from '../models/ReticleModel';

export class ReticlesStore {

  @observable items = [];
  @observable reticleInFocus = null;
  @observable lastReticleInFocus = null;

  constructor(stores) {
    this.stores = stores;
  }

  @action add(payload) {
    this.reticleInFocus = new ReticleModel(payload);
    this.lastReticleInFocus = this.reticleInFocus;
    this.items.push(this.reticleInFocus);
  }

  @action.bound clone() {
    this.add(this.reticleInFocus);
  }

  @action.bound updateReticleInFocus(payload) {
    this.reticleInFocus = this.items.find(item => item.id === payload.id);
  }

  getReticleById(id) {
    return computed(() => {
      return this.items.find(el => el.id === id);
    }).get();
  }

}