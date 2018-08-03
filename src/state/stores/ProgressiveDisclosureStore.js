import { action, computed, observable } from "mobx";

export class ProgressiveDisclosureStore {

    @observable progressId = 1;
    @observable goals = [
        { id: 1, message: 'Create 3 reticles' },
        { id: 2, message: 'Create a single arc reticle' },
        { id: 3, message: 'Create a 3+ graphics reticle' },
        { id: 4, message: 'Clone an existing reticle' },
        { id: 5, message: 'Take a snapshot' }
    ];

    getCurrentGoal() {
        return computed(() => {
            return this.goals.find(el => el.id === this.progressId);
        }).get();
    }

    @action.bound nextGoal() {
        this.progressId++;
    }

}