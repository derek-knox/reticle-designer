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