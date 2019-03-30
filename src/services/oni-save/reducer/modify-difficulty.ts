import { AnyAction } from "redux";

import { OniSaveState, defaultOniSaveState } from "../state";

import { isModifyDifficultyAction } from "../actions/modify-difficulty";

import { tryModifySaveGame, setArrayDict } from "./utils";

export default function modifyDifficultyReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isModifyDifficultyAction(action)) {
    return state;
  }

  const { difficultyType, value } = action.payload;

  return tryModifySaveGame(state, saveGame => ({
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
}
