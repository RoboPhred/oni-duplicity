import { AnyAction } from "redux";

import { OniSaveState, defaultOniSaveState } from "../state";

import { isModifyDifficultyAction } from "../actions/modify-difficulty";

import {
  tryModifySaveGame,
  setArrayDict,
  changeStateBehaviorData,
  replaceGameObject
} from "./utils";
import { getGameObjectGroup, getBehavior } from "oni-save-parser";

export default function modifyDifficultyReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isModifyDifficultyAction(action)) {
    return state;
  }

  const { difficultyType, value } = action.payload;

  state = tryModifySaveGame(state, saveGame => ({
    ...saveGame,
    gameData: {
      ...saveGame.gameData,
      customGameSettings: {
        ...saveGame.gameData.customGameSettings,
        CurrentQualityLevelsBySetting: setArrayDict(
          saveGame.gameData.customGameSettings.CurrentQualityLevelsBySetting,
          difficultyType,
          value
        ) as any
      }
    }
  }));

  if (difficultyType === "SandboxMode") {
    state = tryModifySaveGame(state, saveGame => {
      const saveGameGroup = getGameObjectGroup(
        saveGame.gameObjects,
        "SaveGame"
      );
      if (!saveGameGroup || saveGameGroup.gameObjects.length !== 1) {
        return saveGame;
      }
      let saveGameObj = saveGameGroup.gameObjects[0];
      const saveGameBehavior = getBehavior(saveGameObj, "SaveGame");
      if (!saveGameBehavior) {
        return saveGame;
      }
      saveGameObj = changeStateBehaviorData(
        saveGameObj,
        "SaveGame",
        "templateData",
        {
          sandboxEnabled: value === "Enabled"
        }
      );

      saveGame = replaceGameObject(saveGame, saveGameObj);
      return saveGame;
    });
  }

  return state;
}
