import { action, computed, observable, when } from "mobx";

export class ProgressiveDisclosureStore {

    @observable progressId = 0;
    @observable goals = [
        { id: 0, isCompleted: false, message: 'Create 5 reticles' },
        { id: 1, isCompleted: false, message: 'Create a single arc reticle' },
        { id: 2, isCompleted: false, message: 'Create a 3+ graphics reticle' },
        { id: 3, isCompleted: false, message: 'Clone an existing reticle' },
        { id: 4, isCompleted: false, message: 'Take a snapshot' }
    ];
    @observable hasInteracted = {
        cloneButtonClick: false,
        snapshotButtonClick: false
    }

    constructor(stores) {
        this.stores = stores;
        this.initOneTimeWatchers();        
    }

    initOneTimeWatchers() {
        when(() => this.hasCompletedGoal1(), () => this.onCompletedGoalUpdate());
        when(() => this.hasCompletedGoal2(), () => this.onCompletedGoalUpdate());
        when(() => this.hasCompletedGoal3(), () => this.onCompletedGoalUpdate());
        when(() => this.hasCompletedGoal4(), () => this.onCompletedGoalUpdate());
        when(() => this.hasCompletedGoal5(), () => this.onCompletedGoalUpdate());
    }

    hasCompletedCurrentGoalAtIndex(payload) {
        return this.goals[payload].isCompleted;
    }

    hasCompletedGoal1() {
        return computed(() => {
            const isConditionMet = this.stores.reticlesStore.items.length > 4;
            return this.hasCompletedCurrentGoalAtIndex(0) || isConditionMet;
        }).get();
    }

    hasCompletedGoal2() {
        return computed(() => {
            const reticleInFocus = this.stores.reticlesStore.reticleInFocus;
            if(!reticleInFocus) { return; }
            const hasSingleArc = reticleInFocus.divisions.settings.val === 1;
            const hasSingleArcAngleThreshold = reticleInFocus.spacing.settings.val >= 45;
            const isConditionMet = this.hasCompletedGoal1() && hasSingleArc && hasSingleArcAngleThreshold;
            return this.hasCompletedCurrentGoalAtIndex(1) || isConditionMet;
        }).get();
    }

    hasCompletedGoal3() {
        return computed(() => {
            const reticleInFocus = this.stores.reticlesStore.reticleInFocus;
            if (!reticleInFocus) { return; }
            const hasGraphic = reticleInFocus.graphic.settings.val !== null;
            const hasGraphicTargetCount = reticleInFocus.divisions.settings.val >= 3;
            const isConditionMet = this.hasCompletedGoal1() && this.hasCompletedGoal2() && hasGraphic && hasGraphicTargetCount;
            return this.hasCompletedCurrentGoalAtIndex(2) || isConditionMet;
        }).get();
    }

    hasCompletedGoal4() {
        return computed(() => {
            const isConditionMet = this.hasCompletedGoal1() && this.hasCompletedGoal2() && this.hasCompletedGoal3() && this.hasInteracted.cloneButtonClick;
            return this.hasCompletedCurrentGoalAtIndex(3) || isConditionMet;
        }).get();
    }

    hasCompletedGoal5() {
        return computed(() => {
            const isConditionMet = this.hasCompletedGoal1() && this.hasCompletedGoal2() && this.hasCompletedGoal3() && this.hasCompletedGoal4() && this.hasInteracted.snapshotButtonClick;
            return this.hasCompletedCurrentGoalAtIndex(4) || isConditionMet;
        }).get();
    }

    @action.bound updateHasInteracted(payload) {
        this.hasInteracted[payload] = true;
    }

    @action.bound nextGoal() {
        this.progressId++;
    }

    @action.bound onCompletedGoalUpdate() {
        this.goals[this.progressId].isCompleted = true;
        this.nextGoal();
    }

}