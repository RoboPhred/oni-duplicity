import { AnyAction } from "redux";
import { find, findIndex } from "lodash";
import { SpacecraftManagerBehavior } from "oni-save-parser";

import { OniSaveState, defaultOniSaveState } from "../state";
import { isModifyPlanetAction } from "../actions/modify-planet";

import {
  tryModifySaveGame,
  changeStateBehaviorData,
  replaceGameObject
} from "./utils";

export default function modifyPlanetReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isModifyPlanetAction(action)) {
    return state;
  }

  const { planet, planetId } = action.payload;

  return tryModifySaveGame(state, saveGame => {
    const saveGameGroup = find(
      saveGame.gameObjects,
      x => x.name === "SaveGame"
    );
    if (!saveGameGroup) {
      return saveGame;
    }

    let gameObject = saveGameGroup.gameObjects[0];
    if (!gameObject) {
      return saveGame;
    }

    gameObject = changeStateBehaviorData(
      gameObject,
      SpacecraftManagerBehavior,
      "templateData",
      behavior => {
        const newDestinations = [...behavior.destinations];
        const index = findIndex(newDestinations, x => x.id === planetId);
        newDestinations[index] = {
          ...newDestinations[index],
          ...planet
        };
        return {
          ...behavior,
          destinations: newDestinations
        };
      }
    );

    saveGame = replaceGameObject(saveGame, gameObject);

    return saveGame;
  });
}
