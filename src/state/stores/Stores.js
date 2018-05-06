import { RouterState, RouterStore } from 'mobx-state-router';

import { routes } from '../utils/Routes';
import { ExampleStore } from './ExampleStore';

export default class {
  
  constructor() {
    
    const notFound = new RouterState('notFound');
    this.routerStore = new RouterStore(this, routes, notFound);
    this.exampleStore = new ExampleStore(this);

  }

}