import { AnyAction } from "redux";
import { OniSaveState, defaultOniSaveState } from "../state";

import { isChangeGeyserParameterAction } from "../actions/change-geyser-parameter";

import {
  replaceGameObject,
  changeStateBehaviorData,
  requireGameObject,
  tryModifySaveGame
} from "./utils";
import { SaveGame, GeyserBehavior } from "oni-save-parser";

export default function changeGeyserParameterReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isChangeGeyserParameterAction(action)) {
    return state;
  }

  const { gameObjectId, parameter, value } = action.payload;

  return tryModifySaveGame(state, saveGame =>
    changeGeyserParameter(saveGame, gameObjectId, parameter, value)
  );
}

function changeGeyserParameter(
  saveGame: SaveGame,
  gameObjectId: number,
  parameter: string,
  value: any
) {
  let gameObject = requireGameObject(saveGame, gameObjectId);
  gameObject = changeStateBehaviorData(
    gameObject,
    GeyserBehavior,
    "templateData",
    templateData => ({
      ...templateData,
      configuration: {
        ...templateData.configuration!,
        [parameter]: value
      }
    })
  );

  saveGame = replaceGameObject(saveGame, gameObject);
  return saveGame;
}
