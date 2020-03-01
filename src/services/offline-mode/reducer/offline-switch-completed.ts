import { AnyAction } from "redux";

import { defaultOfflineModeState, OfflineModeState } from "../state";
import { isOfflineSwitchCompletedAction } from "../actions/offline-switch-completed";

export default function offlineSwitchCompletedReducer(
  state: OfflineModeState = defaultOfflineModeState,
  action: AnyAction
): OfflineModeState {
  if (!isOfflineSwitchCompletedAction(action)) {
    return state;
  }

  const { offlineEnabled } = action.payload;
  return {
    ...state,
    enabled: offlineEnabled
  };
}
