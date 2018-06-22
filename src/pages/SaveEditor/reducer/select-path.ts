import produce from "immer";

import { AppState, defaultAppState } from "@/store";

import { ACTION_SELECT_PATH, SelectPathAction } from "../actions/select-path";

export default function selectPathReducer(
  state: AppState = defaultAppState,
  action: SelectPathAction
): AppState {
  if (action.type !== ACTION_SELECT_PATH) {
    return state;
  }

  return produce(state, draft => {
    draft.pages.saveEditor.selectedPath = action.payload;
  });
}
