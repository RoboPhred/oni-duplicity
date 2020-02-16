import { AnyAction } from "redux";
import { SimHashNames, GameObjectGroup, SimHashName } from "oni-save-parser";

import { defaultOniSaveState, OniSaveState } from "../state";
import { isDeleteLooseMaterialAction } from "../actions/delete-loose-material";

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
    return materialsToRemove.indexOf(group.name as SimHashName);
  }

  return {
    ...state,
    saveGame: {
      ...state.saveGame,
      gameObjects: state.saveGame.gameObjects.filter(shouldRemoveMaterial)
    }
  };
}
