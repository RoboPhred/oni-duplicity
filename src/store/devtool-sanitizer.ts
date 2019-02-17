import { AnyAction } from "redux";

import { SaveGame } from "oni-save-parser";

import { AppState } from "@/state";

import { ACTION_RECEIVE_ONISAVE_SUCCESS } from "@/services/oni-save/actions/receive-onisave";

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
    oniSave: state.services.oniSave.saveGame
      ? sanitizeSave(state.services.oniSave.saveGame)
      : null
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
