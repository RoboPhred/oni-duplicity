import produce from "immer";

import { set } from "lodash-es";

import { AppState } from "@/store";

import {
  ACTION_ONISAVE_MODIFY,
  ModifyOniSaveAction
} from "../actions/modify-onisave";

export default function modifyOniSaveReducer(
  state: AppState,
  action: ModifyOniSaveAction
): AppState {
  if (action.type !== ACTION_ONISAVE_MODIFY) {
    return state;
  }

  const { loadingState, oniSave } = state.pages.saveEditor;
  if (loadingState !== "ready" || !oniSave) {
    return state;
  }

  const { path, value } = action.payload;
  return produce(state, draft => {
    set(draft.pages.saveEditor.oniSave!, path, value);
  });
}
