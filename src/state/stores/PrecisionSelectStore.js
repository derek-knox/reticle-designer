import { action, observable } from 'mobx';

export class PrecisionSelectStore {

    @observable isVisible = false;
    @observable matches = [];
    @observable position = { x: 0, y: 0 };

    constructor(stores) {
        this.stores = stores;
    }

    getDist() {
        const editAreaRect = this.stores.editReticleStore.editAreaInfo.rect;
        const distX = editAreaRect.width / 2 - this.position.x;
        const distY = editAreaRect.height / 2 - this.position.y;
        return Math.sqrt(distX * distX + distY * distY);
    }

    @action updatePanel(payload) {
        this.isVisible = payload.isVisible;
        this.position = payload.position || { x: 0, y: 0 };

        const dist = this.getDist();
        const buffer = 25;
        this.matches = this.stores.reticlesStore.items.filter(
          reticle => {
            const val = reticle.radius.settings.val;
            return val < dist + buffer && val > dist - buffer;
          }
        );
    }
}