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
  }
  
  @action.bound clone() {
    this.add(this.reticleInFocus);
  }
  
  @action.bound delete(payload) {
    this.items.remove(this.getReticleById(payload.id));
    const updateTarget = this.items.length > 0 ? this.items[0] : null;
    this.updateReticleInFocus(updateTarget);
  }
  
  @action.bound updateReticleInFocus(payload) {
    const isEmpty = payload === null;
    this.reticleInFocus = isEmpty ? null : this.getReticleById(payload.id);
    this.lastReticleInFocus = isEmpty ? null : this.reticleInFocus;
  }

  getReticleById(id) {
    return computed(() => {
      return this.items.find(el => el.id === id);
    }).get();
  }

}