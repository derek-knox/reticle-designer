import { observable } from 'mobx';
import { uniqueId } from 'lodash';

export class ReticleModel {
  
  @observable id;
  @observable name;

  constructor({ name }) {
    this.id = uniqueId();
    this.name = name;
  }
  
}