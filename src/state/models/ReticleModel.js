import { observable } from 'mobx';
import { uniqueId } from 'lodash';

export class ReticleModel {
  
  static layerId = 0;

  @observable id;
  @observable name;
  @observable radius = 10;
  @observable thickness = 4;
  @observable divisions = 0;
  @observable spacing = 0;
  @observable rotation = 0;
  @observable hasGraphics = false;

  constructor(payload) {
    this.id = uniqueId();
    this.name = 'Layer ' + ++ReticleModel.layerId;
    this.radius = payload.radius || this.radius;
    this.thickness = payload.thickness || this.thickness;
    this.divisions = payload.divisions || this.divisions;
    this.spacing = payload.spacing || this.spacing;
    this.rotation = payload.rotation || this.rotation;
    this.hasGraphics = payload.hasGraphics || this.hasGraphics;
    console.log(this.name);
  }
  
}