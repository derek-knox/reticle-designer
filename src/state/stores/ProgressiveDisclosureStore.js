import { action, computed, observable } from "mobx";

export class ProgressiveDisclosureStore {

    @observable progressId = 1;
    @observable goals = [
        { id: 1, message: 'Create 3 reticles' },
        { id: 2, message: 'Create a single arc reticle' },
        { id: 3, message: 'Create a reticle with 3+ graphics' },
        { id: 4, message: 'Clone an existing reticle' },
        { id: 5, message: 'Take a snapshot of your design' }
    ];

    getCurrentGoal() {
        return computed(() => {
            return this.goals.find(el => el.id === this.progressId);
        }).get();
    }

}