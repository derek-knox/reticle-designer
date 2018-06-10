import { observable } from "mobx";
import { uniqueId } from "lodash";

export class ColorPaletteModel {

  @observable id;
  @observable colors;

  constructor(payload) {
    this.id = uniqueId();
    this.colors = payload.colors;
  }
}
