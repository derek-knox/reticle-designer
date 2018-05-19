import { observable } from 'mobx';
import { uniqueId } from 'lodash';

import { EditControlModel } from './EditControlModel';

export class ReticleModel {
  
  static SettingType = {
    Radius: 'radius',
    Thickness: 'thickness',
    Divisions: 'divisions',
    Spacing: 'spacing',
    Rotation: 'rotation',
    Graphic: 'graphic',
    Direction: 'direction',
    Scale: 'scale'
  }

  static layerId = 0;

  @observable id;
  @observable label;
  @observable radius;
  @observable thickness;
  @observable divisions;
  @observable spacing;
  @observable rotation;
  @observable graphic;
  @observable direction;
  @observable scale;

  constructor(payload) {
    this.id = uniqueId();
    this.label = 'Layer ' + ++ReticleModel.layerId;

    let isClone = typeof payload.radius === "object";
    // TODO duplicate values into settings for a clone vs referencing the same object
    this.radius = new EditControlModel({ label: 'Radius', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Radius, val: payload.radius || 10, min: 1, max: 1000 } }),
    this.thickness = new EditControlModel({ label: 'Thickness', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Thickness, val: 4, min: 1, max: 150 } }),
    this.divisions = new EditControlModel({ label: 'Divisions', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Divisions, val: 0, min: 0, max: 180 } }),
    this.spacing = new EditControlModel({ label: 'Spacing', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Spacing, val: 10, min: 1, max: 359 } }),
    this.rotation = new EditControlModel({ label: 'Rotation', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Rotation, val: 1, min: 1, max: 360 } }),
    this.graphic = new EditControlModel({ label: 'Graphic', type: EditControlModel.Type.List, settings: { reticleProp: ReticleModel.SettingType.Graphic, val: null, items: [] } }),
    this.direction = new EditControlModel({ label: 'Direction', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Direction, val: 1, min: 1, max: 360 } }),
    this.scale = new EditControlModel({ label: 'Scale', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Scale, val: 1, min: 1, max: 5 } })
  }
  
}