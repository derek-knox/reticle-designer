import { action, computed, observable } from "mobx";
import { ColorPaletteModel } from '../models/ColorPaletteModel';

export class ColorStore {

    @observable items = [];
    @observable colorPaletteInFocus = null;
    @observable lastColorPaletteInFocus = null;

    helperColor = { id: -1, color: '#99CC33' }

    constructor(stores) {
        this.stores = stores;

        this.add({ id: 1, colors: ['#F8B195', '#F67280', '#C06C84', '#6C5B7B', '#355C7D'] });
        this.add({ id: 2, colors: ['#A8A7A7', '#CC527A', '#E8175D', '#474747', '#363636'] });
        this.add({ id: 3, colors: ['#99B898', '#FECEAB', '#FF847C', '#E84A5F', '#2A363B'] });
        this.add({ id: 4, colors: ['#A8E6CE', '#DCEDC2', '#FFD3B5', '#FFAAA6', '#FF8C94'] });
        this.add({ id: 5, colors: ['#A7226E', '#EC2049', '#F26B38', '#F7DB4F', '#2F9599'] });
        this.add({ id: 6, colors: ['#E1F5C4', '#EDE574', '#F9D423', '#FC913A', '#FF4E50'] });
        this.add({ id: 7, colors: ['#E5FCC2', '#9DE0AD', '#45ADA8', '#547980', '#594F4F'] });
        this.add({ id: 8, colors: ['#FE4365', '#FC9D9A', '#F9CDAD', '#C8C8A9', '#83AF9B'] });
        this.add({ id: 9, colors: ['#FF005D', '#0085B6', '#0BB4C1', '#00D49D', '#FEDF03'] });
        this.add({ id: 10, colors: ['#2C3339', '#D93732', '#EBEDF3', '#29384C', '#E94347'] });
        this.add({ id: 11, colors: ['#09090A', '#198A7A', '#48A74A', '#D0DC3F', '#F2F2F2'] });
        this.add({ id: 12, colors: ['#F7C803', '#FFA903', '#FF7C03', '#FF4603', '#F21003'] });
        this.add({ id: 13, colors: ['#FFFDF4', '#257D92', '#B2D6CC', '#E06769', '#799A8E'] });
        this.add({ id: 14, colors: ['#A09DF3', '#F960D1', '#4B4EA7', '#FCFFFB', '#0AF7DC'] });
        this.add({ id: 15, colors: ['#0CBFF1', '#14A89D', '#8BC53F', '#B6D985', '#EEF6F5'] });
        this.add({ id: 16, colors: ['#36424E', '#F3FDFE', '#BACEE6', '#A7B9D1', '#90979F'] });
        this.add({ id: 17, colors: ['#BF3B53', '#592D3D', '#011F26', '#0396A6', '#55D9D9'] });
        this.add({ id: 18, colors: ['#1732FF', '#1562E0', '#23ABF7', '#15CDE0', '#17FBD2'] });
        this.add({ id: 19, colors: ['#006A5F', '#007170', '#FF5820', '#70DBFD', '#40838D'] });
        this.add({ id: 20, colors: ['#F84242', '#FF7207', '#FFB707', '#FFF007', '#A8FF6A'] });
        this.add({ id: 21, colors: ['#05668D', '#028090', '#00A896', '#02C39A', '#F0F3BD'] });
        this.add({ id: 22, colors: ['#323741', '#06858C', '#45C48B', '#FFD039', '#F47942'] });
        this.add({ id: 23, colors: ['#F3418D', '#FFA61A', '#0BBE86', '#0A195A', '#F9225E'] });
        this.add({ id: 24, colors: ['#231F20', '#E5443B', '#FF5A4D', '#6F6E6E', '#FFFFFF'] });
        this.add({ id: 25, colors: ['#F01A30', '#F04A58', '#FFF7FA', '#71DDE3', '#0396A6'] });
        this.add({ id: 26, colors: ['#E2CCAE', '#F2D59D', '#D79456', '#363832', '#E9EAEC'] });
        this.add({ id: 27, colors: ['#01A7A5', '#F2F2F0', '#A4A6A5', '#585859', '#0D0D0D'] });
        this.add({ id: 28, colors: ['#C6FF00', '#E8950C', '#FF0000', '#590CE8', '#0DD3FF'] });
        this.add({ id: 29, colors: ['#0288d1', '#61e294', '#54457f', '#907ad6', '#dabfff'] });
        this.add({ id: 30, colors: ['#f0ede3', '#987679', '#ff8200', '#58595b', '#a7a9ac'] });
        this.add({ id: 31, colors: ['#ccdbdc', '#0288d1', '#3e000c', '#880d1e', '#fe4a49'] });
        this.add({ id: 32, colors: ['#0288d1', '#3d2645', '#934683', '#7ac74f', '#9be564'] });
        this.add({ id: 33, colors: ['#878685', '#73d6cd', '#d64a84', '#f7ea88', '#ff9f8c'] });
        this.add({ id: 34, colors: ['#a3b18a', '#edf0da', '#dcf763', '#7d7c84', '#cb9173'] });
        this.add({ id: 35, colors: ['#ac441e', '#b8b42d', '#697a21', '#fffce8', '#3e363f'] });
        this.add({ id: 36, colors: ['#0c0f0a', '#fffeff', '#41ead4', '#fffc31', '#fe5f55'] });
        this.add({ id: 37, colors: ['#3ab795', '#a0e8af', '#86baa1', '#fffc31', '#fe5f55'] });
        this.add({ id: 38, colors: ['#71c1c0', '#3dbdbf', '#249c9e', '#1b4060', '#20265d'] });
        this.add({ id: 39, colors: ['#5fad56', '#f2c14e', '#4d9078', '#b4436c', '#fe5f55'] });
        this.add({ id: 40, colors: ['#f2f7f2', '#725e54', '#443627', '#7cebff', '#66e2ff'] });
        this.add({ id: 41, colors: ['#012b45', '#ffdc46', '#65a5f3', '#1f3650', '#d6e9ff'] });
        this.add({ id: 42, colors: ['#e1ee0f', '#50c9ce', '#ff239b', '#9883e5', '#fcd3de'] });
        this.add({ id: 43, colors: ['#ac42ff', '#2aa1ff', '#40ff69', '#ffff2f', '#ff982f'] });
        this.add({ id: 44, colors: ['#fa9b88', '#db7a79', '#f29b9a', '#fee8c8', '#ffcfa9'] });
        this.add({ id: 45, colors: ['#f5e7e0', '#a88d84', '#7a8b99', '#5e6b7d', '#e9bf98'] });
        this.add({ id: 46, colors: ['#8370ff', '#a16bfe', '#c06deb', '#d6a2da', '#bcade5'] });
        this.add({ id: 47, colors: ['#6372c6', '#ff6666', '#59ccb7', '#be6ed8', '#dce0d9'] });
        this.add({ id: 48, colors: ['#5f2851', '#fa7d78', '#f9d301', '#027c84', '#32e3c2'] });
        this.add({ id: 49, colors: ['#774eb7', '#83f79e', '#83f7c4', '#7760e0', '#83f7b7'] });
        this.add({ id: 50, colors: ['#01687f', '#2d3047', '#fffd82', '#ff9b71', '#00b1b3'] });
        this.add({ id: 51, colors: ['#b9d6f2', '#23395b', '#edae49', '#d1495b', '#003d5b'] });
        this.add({ id: 52, colors: ['#9cf6f6', '#e85d75', '#9f9aa4', '#fff07c', '#ffb997'] });
        this.add({ id: 53, colors: ['#16bac5', '#f6511d', '#ffb400', '#7fb800', '#0d2c54'] });
        this.add({ id: 54, colors: ['#67aeca', '#675682', '#5f0f4e', '#e52a6f', '#fcfffe'] });
        this.add({ id: 55, colors: ['#4cd3f5', '#a4d555', '#ff5992', '#841983', '#f7f3e3'] });
        this.add({ id: 56, colors: ['#bc002d', '#8ea604', '#f5bb00', '#ec9f05', '#d76a03'] });
        this.add({ id: 57, colors: ['#5e0b0b', '#4c2a85', '#6b7fd7', '#bcedf6', '#ddfbd2'] });
        this.add({ id: 59, colors: ['#11151c', '#6b7a8f', '#f7882f', '#f7c331', '#dcc7aa'] });
        this.add({ id: 50, colors: ['#71f79f', '#3dd6d0', '#590004', '#034732', '#8ea604'] });
        this.add({ id: 60, colors: ['#fff500', '#fff95c', '#edb3d4', '#db6aaa', '#c7177a'] });

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

    getHelperColor() {
        return this.helperColor.id;
    }

    getColor(payload) {
        return computed(() => {
            if (payload === this.helperColor.id) { return this.helperColor.color; }
            return this.colorPaletteInFocus.colors[payload];
        }).get();
    }

    getColorPaletteById(id) {
        return computed(() => {
            return this.items.find(el => el.id === id);
        }).get();
    }

}