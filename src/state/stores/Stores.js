import { RouterState, RouterStore } from 'mobx-state-router';

import { routes } from '../utils/Routes';
import { ReticlesStore } from './ReticlesStore';
import { EditReticleStore } from './EditReticleStore';
import { ColorStore } from './ColorStore';

export default class {
  
  constructor() {
    
    const notFound = new RouterState('notFound');
    this.routerStore = new RouterStore(this, routes, notFound);
    this.reticlesStore = new ReticlesStore(this);
    this.editReticleStore = new EditReticleStore(this);
    this.colorStore = new ColorStore(this);

  }

}