import produce from "immer";

import { AppState, defaultAppState } from "@/store";

import {
  ACTION_DISMISS_ERROR,
  DismissErrorAction
} from "../actions/dismiss-error";

export default function dismissErrorReducer(
  state: AppState = defaultAppState,
  action: DismissErrorAction
): AppState {
  if (action.type !== ACTION_DISMISS_ERROR) {
    return state;
  }

  return produce(state, draft => {
    draft.pages.saveEditor.error = null;
  });
}
