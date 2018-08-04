import { action, computed, observable } from "mobx";

export class ProgressiveDisclosureStore {

    @observable progressId = 0;
    @observable goals = [
        { id: 0, message: 'Create 5 reticles' },
        { id: 1, message: 'Create a single arc reticle' },
        { id: 2, message: 'Create a 3+ graphics reticle' },
        { id: 3, message: 'Clone an existing reticle' },
        { id: 4, message: 'Take a snapshot' }
    ];
    @observable hasInteracted = {
        cloneButtonClick: false,
        snapshotButtonClick: false
    }

    constructor(stores) {
        this.stores = stores;
    }

    hasCompletedGoal1() {
        return computed(() => {
            return this.stores.reticlesStore.items.length > 4;
        }).get();
    }

    hasCompletedGoal2() {
        return computed(() => {
            const reticleInFocus = this.stores.reticlesStore.reticleInFocus;
            const hasSingleArc = reticleInFocus.divisions.settings.val === 1;
            const hasSingleArcAngleThreshold = reticleInFocus.spacing.settings.val >= 45;
            return this.hasCompletedGoal1() && hasSingleArc && hasSingleArcAngleThreshold;
        }).get();
    }

    hasCompletedGoal3() {
        return computed(() => {
            const reticleInFocus = this.stores.reticlesStore.reticleInFocus;
            const hasGraphic = reticleInFocus.graphic.settings.val !== null;
            const hasGraphicTargetCount = reticleInFocus.divisions.settings.val >= 3;
            return this.hasCompletedGoal1() && this.hasCompletedGoal2() && hasGraphic && hasGraphicTargetCount;
        }).get();
    }

    hasCompletedGoal4() {
        return computed(() => {
            return this.hasCompletedGoal1() && this.hasCompletedGoal2() && this.hasCompletedGoal3() && this.hasInteracted.cloneButtonClick;
        }).get();
    }

    hasCompletedGoal5() {
        return computed(() => {
            return this.hasCompletedGoal1() && this.hasCompletedGoal2() && this.hasCompletedGoal3() && this.hasCompletedGoal4() && this.hasInteracted.snapshotButtonClick;
        }).get();
    }

    @action.bound updateHasInteracted(payload) {
        this.hasInteracted[payload] = true;
    }

    @action.bound nextGoal() {
        this.progressId++;
    }

}