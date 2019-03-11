import { AnyAction } from "redux";

import { defaultOniSaveState, OniSaveState } from "../state";
import { isDeleteLooseMaterialAction } from "../actions/delete-loose-material";
import { SimHashNames } from "oni-save-parser";

export default function deleteLooseMaterialReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isDeleteLooseMaterialAction(action)) {
    return state;
  }

  if (!state.saveGame) {
    return state;
  }

  const { materialType } = action.payload;

  let materialsToRemove = SimHashNames;
  if (materialType) {
    materialsToRemove = [materialType];
  }

  return {
    ...state,
    saveGame: {
      ...state.saveGame,
      gameObjects: state.saveGame.gameObjects.filter(
        x => materialsToRemove.indexOf(x.name) === -1
      )
    }
  };
}
