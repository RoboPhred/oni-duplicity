import { AnyAction } from "redux";
import { SaveGame } from "oni-save-parser";
import produce from "immer";
import { set } from "lodash-es";

import { OniSaveState, defaultOniSaveState } from "../state";

import { isModifyRawAction } from "../actions/modify-raw";

import { tryModifySaveGame } from "./utils";

export default function modifyRawReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isModifyRawAction(action)) {
    return state;
  }

  let { path, data } = action.payload;

  return tryModifySaveGame(state, saveGame =>
    performModifyRaw(saveGame, path, data)
  );
}

function performModifyRaw(saveGame: SaveGame, path: string[], data: any) {
  return produce(saveGame, draftSave => {
    set(draftSave, path, data);
  });
}
