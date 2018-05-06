import { action, computed, observable} from 'mobx';
import { ExampleModel } from '../models/ExampleModel';

export class ExampleStore {

  @observable items = []

  constructor(stores) {
    this.stores = stores;
    this.add({ name: 'test' });
  }

  @action add(payload) {
    this.items.push(new ExampleModel({ name: payload.name }));
  }

  getExampleById(id) {
    return computed(() => {
      return this.items.find(el => el.id === id);
    }).get();
  }

}