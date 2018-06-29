import { AppState, defaultAppState } from "@/state";

import {
  ACTION_DISMISS_ERROR,
  DismissErrorAction
} from "@/actions/dismiss-error";

export default function dismissErrorReducer(
  state: AppState = defaultAppState,
  action: DismissErrorAction
): AppState {
  if (action.type !== ACTION_DISMISS_ERROR) {
    return state;
  }

  return {
    ...state,
    error: null
  };
}
