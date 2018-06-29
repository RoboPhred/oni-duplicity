import { AnyAction } from "redux";

import { SaveGame } from "oni-save-parser";

import { ACTION_RECEIVE_ONISAVE_SUCCESS } from "@/actions/receive-onisave";
import { AppState } from "@/state";

export function actionSanitizer(action: AnyAction): AnyAction {
  if (action.type === ACTION_RECEIVE_ONISAVE_SUCCESS) {
    return {
      ...action,
      payload: sanitizeSave(action.payload)
    };
  }
  return action;
}

export function stateSanitizer(state: AppState): any {
  return {
    ...state,
    oniSave: state.oniSave ? sanitizeSave(state.oniSave) : null
  };
}

function sanitizeSave(save: SaveGame): any {
  return {
    ...save,
    world: {
      ...save.world,
      streamed: "~snip~"
    }
  };
}
