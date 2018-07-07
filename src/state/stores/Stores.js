import { RouterState, RouterStore } from 'mobx-state-router';

import { routes } from '../utils/Routes';
import { ColorStore } from './ColorStore';
import { EditReticleStore } from './EditReticleStore';
import { ReticlesStore } from './ReticlesStore';
import { ProgressiveDisclosureStore } from './ProgressiveDisclosureStore';

export default class {
  
  constructor() {
    
    const notFound = new RouterState('notFound');
    this.routerStore = new RouterStore(this, routes, notFound);
    this.colorStore = new ColorStore(this);
    this.editReticleStore = new EditReticleStore(this);
    this.reticlesStore = new ReticlesStore(this);
    this.progressiveDisclosureStore = new ProgressiveDisclosureStore(this);

  }

}