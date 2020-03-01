import { AnyAction } from "redux";

export const ACTION_OFFLINE_PROBE_COMPLETED = "@offline-mode/offline-probe-completed" as const;
export const offlineProbeCompleted = (
  offlineSupported: boolean,
  offlineEnabled: boolean
) => ({
  type: ACTION_OFFLINE_PROBE_COMPLETED,
  payload: { offlineSupported, offlineEnabled }
});
export type OfflineProbeCompletedAction = ReturnType<
  typeof offlineProbeCompleted
>;
export function isOfflineProbeCompletedAction(
  action: AnyAction
): action is OfflineProbeCompletedAction {
  return action.type === ACTION_OFFLINE_PROBE_COMPLETED;
}
