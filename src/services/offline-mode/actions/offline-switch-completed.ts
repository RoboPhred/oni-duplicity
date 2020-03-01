import { AnyAction } from "redux";

export const ACTION_OFFLINE_SWITCH_COMPLETED = "@offline-mode/offline-switch-completed" as const;
export const offlineSwitchCompleted = (offlineEnabled: boolean) => ({
  type: ACTION_OFFLINE_SWITCH_COMPLETED,
  payload: { offlineEnabled }
});
export type OfflineSwitchCompletedAction = ReturnType<
  typeof offlineSwitchCompleted
>;
export function isOfflineSwitchCompletedAction(
  action: AnyAction
): action is OfflineSwitchCompletedAction {
  return action.type === ACTION_OFFLINE_SWITCH_COMPLETED;
}
