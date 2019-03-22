import { AnyAction } from "redux";

import { defaultOniSaveState, OniSaveState } from "../state";
import { isDeleteLooseMaterialAction } from "../actions/delete-loose-material";
import { SimHashNames, GameObjectGroup } from "oni-save-parser";

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

  function shouldRemoveMaterial(group: GameObjectGroup) {
    return materialsToRemove.indexOf(group.name);
  }

  return {
    ...state,
    saveGame: {
      ...state.saveGame,
      gameObjects: state.saveGame.gameObjects.filter(shouldRemoveMaterial)
    }
  };
}
