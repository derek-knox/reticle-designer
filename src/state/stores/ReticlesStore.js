import { action, computed, observable} from 'mobx';
import { ReticleModel } from '../models/ReticleModel';

export class ReticlesStore {

  @observable isDrawing = false;
  @observable items = [];

  constructor(stores) {
    this.stores = stores;
    this.add({ name: 'test' });
  }

  @action add(payload) {
    this.items.push(new ReticleModel({ name: payload.name }));
  }

  getReticleById(id) {
    return computed(() => {
      return this.items.find(el => el.id === id);
    }).get();
  }

}