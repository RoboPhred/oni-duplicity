import { AnyAction } from "redux";

import { SaveGame } from "oni-save-parser";

import { AppState } from "@/state";

import { ACTION_RECEIVE_ONISAVE_SUCCESS } from "@/services/oni-save/actions/receive-onisave";
import { ACTION_ONISAVE_LOAD } from "@/services/oni-save/actions/load-onisave";
import { ACTION_ONISAVE_PARSE_PROGRESS } from "@/services/oni-save/actions/parse-progress";

export const actionsBlacklist: string[] = [
  ACTION_ONISAVE_LOAD,
  ACTION_ONISAVE_PARSE_PROGRESS
];

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
    services: {
      ...state.services,
      oniSave: {
        ...state.services.oniSave,
        saveGame: sanitizeSave(state.services.oniSave.saveGame)
      }
    }
  };
}

function sanitizeSave(save: SaveGame | null): any {
  if (!save) {
    return null;
  }
  return {
    ...save,
    world: {
      ...save.world,
      streamed: "~snip~"
    }
  };
}
