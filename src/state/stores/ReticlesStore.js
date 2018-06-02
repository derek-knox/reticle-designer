import { action, computed, observable } from "mobx";
import { ReticleModel } from '../models/ReticleModel';

export class ReticlesStore {

  @observable items = [];
  @observable reticleInFocus = null;
  @observable lastReticleInFocus = null;

  constructor(stores) {
    this.stores = stores;
  }

  @action add(payload) {
    const newReticle = new ReticleModel(payload);
    this.items.push(newReticle);
    
    this.updateReticleInFocus(newReticle);
    this.lastReticleInFocus = this.reticleInFocus;
  }

  @action.bound clone() {
    this.add(this.reticleInFocus);
  }

  @action.bound updateReticleInFocus(payload) {
    this.reticleInFocus = this.getReticleById(payload.id);
  }

  getReticleById(id) {
    return computed(() => {
      return this.items.find(el => el.id === id);
    }).get();
  }

}