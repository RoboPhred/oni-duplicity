import { createAction } from "@/action-utils";

export const ACTION_CYCLE_SET = "@save-editor/general/cycle/set";
export const setCycle = createAction(ACTION_CYCLE_SET, (x: {cycle: number}) => x);
export type SetCycleAction = ReturnType<typeof setCycle>;

export const ACTION_IMMIGRATION_TIMER_SET = "@save-editor/immigration/timer/set";
export const setImmigrationTimer = createAction(ACTION_IMMIGRATION_TIMER_SET, (x: {time: number}) => x);
export type SetImmigrationTimerAction = ReturnType<typeof setImmigrationTimer>;

export const ACTION_IMMIGRATION_READY_SET = "@save-editor/immigration/ready/set";
export const setImmigrationReady = createAction(ACTION_IMMIGRATION_READY_SET, (x: {ready: boolean}) => x);
export type SetImmigrationReadyAction = ReturnType<typeof setImmigrationReady>;

export type GeneralActions =
    SetCycleAction
    | SetImmigrationTimerAction
    | SetImmigrationReadyAction;