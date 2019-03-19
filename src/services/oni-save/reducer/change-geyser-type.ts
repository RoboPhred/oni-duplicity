import { AnyAction } from "redux";
import { startsWith } from "lodash-es";
import { HashedString, GeyserBehavior } from "oni-save-parser";

import { OniSaveState, defaultOniSaveState } from "../state";

import { isChangeGeyserTypeAction } from "../actions/change-geyser-type";
import { gameObjectTypesByIdSelector } from "../selectors/save-game";
import { getGameObjectById } from "../utils";
import {
  addGameObject,
  removeGameObject,
  changeBehaviorTemplateDataState
} from "./utils";

export default function changeGeyserTypeReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isChangeGeyserTypeAction(action)) {
    return state;
  }

  if (!state.saveGame) {
    return state;
  }

  const { gameObjectId, geyserType } = action.payload;

  const typesById = gameObjectTypesByIdSelector.local(state);
  if (!typesById || !typesById[gameObjectId]) {
    return state;
  }

  const oldType = typesById[gameObjectId];
  if (!startsWith(oldType, "GeyserGeneric_")) {
    return state;
  }

  let saveGame = state.saveGame;

  let gameObject = getGameObjectById(saveGame, gameObjectId);
  if (!gameObject) {
    return state;
  }

  // Remove the object from the old type, as the type is changing.
  saveGame = removeGameObject(saveGame, oldType, gameObjectId);

  // Update the geyser behavior to emit the new element.
  gameObject = changeBehaviorTemplateDataState(
    gameObject,
    GeyserBehavior,
    templateData => ({
      ...templateData,
      configuration: {
        ...templateData.configuration!,
        typeId: HashedString(geyserType)
      }
    })
  );
  if (!gameObject) {
    return state;
  }

  // Add the game object back in to reflect the new type.
  saveGame = addGameObject(saveGame, `GeyserGeneric_${geyserType}`, gameObject);

  return {
    ...state,
    saveGame,
    isModified: true
  };
}
