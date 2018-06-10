import { action, computed, observable } from "mobx";
import { ColorPaletteModel } from '../models/ColorPaletteModel';

export class ColorStore {

    @observable items = [];
    @observable colorPaletteInFocus = null;
    @observable lastColorPaletteInFocus = null;

    constructor(stores) {
        this.stores = stores;

        this.add({ colors: ['#F8B195', '#F67280', '#C06C84', '#6C5B7B', '#355C7D'] });
        this.add({ colors: ['#A8A7A7', '#CC527A', '#E8175D', '#474747', '#363636'] });
        this.add({ colors: ['#99B898', '#FECEAB', '#FF847C', '#E84A5F', '#2A363B'] });
        this.add({ colors: ['#A8E6CE', '#DCEDC2', '#FFD3B5', '#FFAAA6', '#FF8C94'] });
        this.add({ colors: ['#A7226E', '#EC2049', '#F26B38', '#F7DB4F', '#2F9599'] });
        this.add({ colors: ['#E1F5C4', '#EDE574', '#F9D423', '#FC913A', '#FF4E50'] });
        this.add({ colors: ['#E5FCC2', '#9DE0AD', '#45ADA8', '#547980', '#594F4F'] });
        this.add({ colors: ['#FE4365', '#FC9D9A', '#F9CDAD', '#C8C8A9', '#83AF9B'] });

        this.colorPaletteInFocus = this.items[0];
    }

    @action add(payload) {
        const newColorPalette = new ColorPaletteModel(payload);
        this.items.push(newColorPalette);

        this.updateColorPaletteInFocus(newColorPalette);
        this.lastColorPaletteInFocus = this.colorPaletteInFocus;
    }

    @action.bound updateColorPaletteInFocus(payload) {
        this.colorPaletteInFocus = this.getColorPaletteById(payload.id);
    }

    getColor(payload) {
        return computed(() => {
            return this.colorPaletteInFocus.colors[payload];
        }).get();
    }

    getColorPaletteById(id) {
        return computed(() => {
            return this.items.find(el => el.id === id);
        }).get();
    }

}