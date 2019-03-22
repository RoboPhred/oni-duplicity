import { AnyAction } from "redux";
import { SaveGame } from "oni-save-parser";

import { OniSaveState, defaultOniSaveState } from "../state";

import {
  isModifyBehaviorAction,
  BehaviorDataTarget
} from "../actions/modify-behavior";

import {
  requireGameObject,
  changeStateBehaviorData,
  replaceGameObject,
  tryModifySaveGame
} from "./utils";

export default function modifyBehaviorReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isModifyBehaviorAction(action)) {
    return state;
  }

  let { gameObjectId, behaviorId, target, value } = action.payload;

  return tryModifySaveGame(state, saveGame =>
    performModifyBehavior(saveGame, gameObjectId, behaviorId, target, value)
  );
}

function performModifyBehavior(
  saveGame: SaveGame,
  gameObjectId: number,
  behaviorName: string,
  target: BehaviorDataTarget,
  value: any
) {
  let gameObject = requireGameObject(saveGame, gameObjectId);

  switch (target) {
    case BehaviorDataTarget.Template:
      gameObject = changeStateBehaviorData(
        gameObject,
        behaviorName,
        "templateData",
        value
      );
      break;
    case BehaviorDataTarget.Extra:
      gameObject = changeStateBehaviorData(
        gameObject,
        behaviorName,
        "extraData",
        value
      );
      break;
  }

  saveGame = replaceGameObject(saveGame, gameObject);
  return saveGame;
}
