import { action, computed, observe, observable } from "mobx";
import { clamp, uniqueId } from 'lodash';

import { EditControlModel } from './EditControlModel';

export class ReticleModel {
  
  static SettingType = {
    Color: 'color',
    Opacity: 'opacity',
    Radius: 'radius',
    Thickness: 'thickness',
    Divisions: 'divisions',
    Spacing: 'spacing',
    Rotation: 'rotation',
    Graphic: 'graphic',
    Stroke: 'stroke',
    Direction: 'direction',
    Scale: 'scale'
  }

  static layerId = 0;

  @observable id;
  @observable label;
  @observable color;
  @observable opacity;
  @observable radius;
  @observable thickness;
  @observable divisions;
  @observable spacing;
  @observable rotation;
  @observable graphic;
  @observable stroke;
  @observable direction;
  @observable scale;
  
  @observable controls;
  @observable controlInFocus;

  constructor(payload) {
    this.id = uniqueId();
    this.label = payload.dummyId || 'R-' + ++ReticleModel.layerId;

    this.initModels(payload);
    this.initControls();
  }

  initModels(payload) {
    
    // Special radius control model and enforce initial clamping
    let isClone = typeof payload.radius === "object";
    let targetRadius = isClone ? payload.radius.settings.val : payload.radius || 10;
    this.radius = new EditControlModel({ label: 'Radius', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Radius, val: targetRadius, min: 1, max: 1000, step: 1 } });
    this.updateSettingsValue({ val: this.radius.settings.val, reticleProp: 'radius' });    

    // Remaining default control models
    this.color = new EditControlModel({ label: 'Color', type: EditControlModel.Type.Grid, settings: { reticleProp: ReticleModel.SettingType.Color, val: isClone ? payload.color.settings.val : 0 } });
    this.opacity = new EditControlModel({ label: 'Opacity', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Opacity, val: isClone ? payload.opacity.settings.val : 1, min: 0, max: 1, step: .01 } });
    this.thickness = new EditControlModel({ label: 'Thickness', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Thickness, val: isClone ? payload.thickness.settings.val : 4, min: 1, max: 150, step: 1 } });
    this.divisions = new EditControlModel({ label: 'Divisions', type: EditControlModel.Type.WeightedRange, settings: { reticleProp: ReticleModel.SettingType.Divisions, val: isClone ? payload.divisions.settings.val : 0, min: 0, max: 270, step: 1 } });
    this.spacing = new EditControlModel({ label: 'Spacing', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Spacing, val: isClone ? payload.spacing.settings.val : 1, min: 1, max: 359, step: .1 } });
    this.rotation = new EditControlModel({ label: 'Rotation', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Rotation, val: isClone ? payload.rotation.settings.val : 0, min: 0, max: 360, step: .1 } });
    this.graphic = new EditControlModel({ label: 'Graphic', type: EditControlModel.Type.Grid, settings: { reticleProp: ReticleModel.SettingType.Graphic, val: isClone ? payload.graphic.settings.val : null } });
    this.stroke = new EditControlModel({ label: 'Stroke', type: EditControlModel.Type.ToggleRange, settings: { reticleProp: ReticleModel.SettingType.Stroke, isStroke: isClone ? payload.stroke.settings.isStroke : true, val: isClone ? payload.stroke.settings.val : 1, min: 1, max: 10, step: 1  } });
    this.direction = new EditControlModel({ label: 'Direction', type: EditControlModel.Type.Range, settings: { reticleProp: ReticleModel.SettingType.Direction, val: isClone ? payload.direction.settings.val : 0, min: 0, max: 360, step: 1 } });
    this.scale = new EditControlModel({ label: 'Scale', type: EditControlModel.Type.Grid, settings: { reticleProp: ReticleModel.SettingType.Scale, val: isClone ? payload.scale.settings.val : {x: 1, y: 1}, min: .1, max: 2, step: .1 } });
  }

  initControls() {
    this.controlInFocus = this.radius;
    this.controls = [this.color,
                     this.opacity,
                     this.radius,
                     this.thickness,
                     this.divisions,
                     this.spacing,
                     this.rotation,
                     this.graphic,
                     this.stroke,
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
    if(control.type === EditControlModel.Type.Range || control.type === EditControlModel.Type.WeightedRange)
      newVal = clamp(payload.val, control.settings.min, control.settings.max);
    else if(control.type === EditControlModel.Type.Grid)
      newVal = payload.val;
    else if(control.type === EditControlModel.Type.ToggleRange) {
      newVal = payload.val ? clamp(payload.val, control.settings.min, control.settings.max) : control.settings.val;
      control.settings.isStroke = payload.hasOwnProperty('isStroke') ? payload.isStroke : control.settings.isStroke;
    }
    control.settings.val = newVal;
  }

  @action.bound onSettingsChange(payload) {
    this.updateControlInFocus(payload.control);
  }

  getControlsVisibility() {
    return computed(() => {
      let obj = {},
          hasDivisions = this.divisions.settings.val > 0,
          hasValidGraphicsControls = Boolean(hasDivisions && this.graphic.settings.val);
      obj[ReticleModel.SettingType.Color] = true;
      obj[ReticleModel.SettingType.Opacity] = true;
      obj[ReticleModel.SettingType.Radius] = true;
      obj[ReticleModel.SettingType.Thickness] = !hasValidGraphicsControls;
      obj[ReticleModel.SettingType.Divisions] = true;
      obj[ReticleModel.SettingType.Spacing] = hasDivisions && !hasValidGraphicsControls;
      obj[ReticleModel.SettingType.Rotation] = hasDivisions;
      obj[ReticleModel.SettingType.Graphic] = hasDivisions;
      obj[ReticleModel.SettingType.Stroke] = hasValidGraphicsControls;
      obj[ReticleModel.SettingType.Direction] = hasValidGraphicsControls;
      obj[ReticleModel.SettingType.Scale] = hasValidGraphicsControls;
      return obj;
    }).get();
  }
}