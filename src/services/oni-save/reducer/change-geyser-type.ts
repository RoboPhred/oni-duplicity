import { AnyAction } from "redux";
import { HashedString, GeyserBehavior, SaveGame } from "oni-save-parser";

import { OniSaveState, defaultOniSaveState } from "../state";

import { isChangeGeyserTypeAction } from "../actions/change-geyser-type";

import {
  addGameObject,
  removeGameObject,
  changeStateBehaviorData,
  requireGameObject,
  tryModifySaveGame
} from "./utils";

export default function changeGeyserTypeReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isChangeGeyserTypeAction(action)) {
    return state;
  }

  const { gameObjectId, geyserType } = action.payload;

  return tryModifySaveGame(state, saveGame =>
    changeGeyserType(saveGame, gameObjectId, geyserType)
  );
}

function changeGeyserType(
  saveGame: SaveGame,
  gameObjectId: number,
  geyserType: string
): SaveGame {
  let gameObject = requireGameObject(saveGame, gameObjectId);

  gameObject = changeStateBehaviorData(
    gameObject,
    GeyserBehavior,
    "templateData",
    templateData => ({
      ...templateData,
      configuration: {
        ...templateData.configuration!,
        typeId: HashedString(geyserType)
      }
    })
  );

  saveGame = removeGameObject(saveGame, gameObjectId);
  saveGame = addGameObject(saveGame, `GeyserGeneric_${geyserType}`, gameObject);

  return saveGame;
}
