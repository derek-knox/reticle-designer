import { action, computed, observe, observable } from 'mobx';
import { clamp, uniqueId } from 'lodash';

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
  
  @observable controls;
  @observable controlInFocus;

  constructor(payload) {
    this.id = uniqueId();
    this.label = 'Layer ' + ++ReticleModel.layerId;

    this.initModels(payload);
    this.initControls();
  }

  initModels(payload) {
    
    // Special radius control model and enforce initial clamping
    let isClone = typeof payload.radius === "object";
    let targetRadius = isClone ? payload.radius.settings.val : payload.radius || 10;
    this.radius = new EditControlModel({ label: 'Radius', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Radius, val: targetRadius, min: 1, max: 1000 } });
    this.updateSettingsValue({ val: this.radius.settings.val, reticleProp: 'radius' });    

    // Remaining default control models
    this.thickness = new EditControlModel({ label: 'Thickness', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Thickness, val: isClone ? payload.thickness.settings.val : 4, min: 1, max: 150 } });
    this.divisions = new EditControlModel({ label: 'Divisions', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Divisions, val: isClone ? payload.divisions.settings.val : 0, min: 0, max: 180 } });
    this.spacing = new EditControlModel({ label: 'Spacing', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Spacing, val: isClone ? payload.spacing.settings.val : 1, min: 1, max: 359 } });
    this.rotation = new EditControlModel({ label: 'Rotation', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Rotation, val: isClone ? payload.rotation.settings.val : 1, min: 1, max: 360 } });
    this.graphic = new EditControlModel({ label: 'Graphic', type: EditControlModel.Type.List, settings: { reticleProp: ReticleModel.SettingType.Graphic, val: isClone ? payload.graphic.settings.val : null } });
    this.direction = new EditControlModel({ label: 'Direction', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Direction, val: isClone ? payload.direction.settings.val : 1, min: 1, max: 360 } });
    this.scale = new EditControlModel({ label: 'Scale', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Scale, val: isClone ? payload.scale.settings.val : 1, min: 1, max: 5 } });
  }

  initControls() {
    this.controlInFocus = this.radius;
    this.controls = [this.radius,
                     this.thickness,
                     this.divisions,
                     this.spacing,
                     this.rotation,
                     this.graphic,
                     this.direction,
                     this.scale];
    this.controls.forEach((control) => {
      observe(control.settings, (change) => this.onSettingsChange({ control, change }));
    });
  }

  @action.bound updateControlInFocus(payload) {
    this.controlInFocus = payload;
  }

  @action.bound updateSettingsValue(payload) {
    let control = this[payload.reticleProp];
    let newVal = null;
    if(control.type === EditControlModel.Type.Range)
      newVal = clamp(payload.val, control.settings.min, control.settings.max);
    else if(control.type === EditControlModel.Type.List)
      newVal = payload.val;
    control.settings.val = newVal;
  }

  @action.bound onSettingsChange(payload) {
    this.updateControlInFocus(payload.control);
  }
}