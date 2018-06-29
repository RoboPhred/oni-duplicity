import produce from "immer";

import { set } from "lodash-es";

import { AppState } from "@/state";

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

  const { loadingState, oniSave } = state;
  if (loadingState !== "ready" || !oniSave) {
    return state;
  }

  const { path, value } = action.payload;

  return produce(state, draft => {
    set(draft.oniSave!, path, value);
  });
}
