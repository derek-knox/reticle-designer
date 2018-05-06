import { observable } from 'mobx';
import { uniqueId } from 'lodash';

export class ExampleModel {
  
  @observable id;
  @observable name;

  constructor({ name }) {
    this.id = uniqueId();
    this.name = name;
  }
  
}