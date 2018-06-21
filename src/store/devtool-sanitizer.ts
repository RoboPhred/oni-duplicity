import { AnyAction } from "redux";
import { AppState } from "./state";
import { ACTION_RECEIVE_ONISAVE_SUCCESS } from "@/pages/SaveEditor/actions/receive-onisave";
import { SaveGame } from "oni-save-parser";

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
    pages: {
      ...state.pages,
      saveEditor: {
        ...state.pages.saveEditor,
        oniSave: state.pages.saveEditor.oniSave
          ? sanitizeSave(state.pages.saveEditor.oniSave)
          : null
      }
    }
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
