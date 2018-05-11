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
  @observable graphic = null;
  @observable direction = 0;
  @observable scale = 0;

  constructor(payload) {
    this.id = uniqueId();
    this.name = 'Layer ' + ++ReticleModel.layerId;
    this.radius = payload.radius || this.radius;
    this.thickness = payload.thickness || this.thickness;
    this.divisions = payload.divisions || this.divisions;
    this.spacing = payload.spacing || this.spacing;
    this.rotation = payload.rotation || this.rotation;
    this.graphic = payload.graphic || this.graphic;
    this.direction = payload.direction || this.direction;
    this.scale = payload.scale || this.scale;
  }
  
}