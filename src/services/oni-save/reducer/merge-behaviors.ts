import { AnyAction } from "redux";
import { SaveGame } from "oni-save-parser";

import { OniSaveState, defaultOniSaveState } from "../state";

import {
  isMergeBehaviorsAction,
  BehaviorMergeData
} from "../actions/merge-behaviors";
import {
  requireGameObject,
  changeStateBehaviorData,
  replaceGameObject,
  tryModifySaveGame
} from "./utils";

export default function mergeBehaviorsReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isMergeBehaviorsAction(action)) {
    return state;
  }

  const { gameObjectId, behaviors } = action.payload;

  return tryModifySaveGame(state, saveGame =>
    performMergeBehaviors(saveGame, gameObjectId, behaviors)
  );
}

function performMergeBehaviors(
  saveGame: SaveGame,
  gameObjectId: number,
  behaviors: Record<string, BehaviorMergeData>
): SaveGame {
  let gameObject = requireGameObject(saveGame, gameObjectId);

  for (const behaviorName of Object.keys(behaviors)) {
    const behavior = behaviors[behaviorName];

    if (behavior.templateData) {
      gameObject = changeStateBehaviorData(
        gameObject,
        behaviorName,
        "templateData",
        _ => behavior.templateData
      );
    }

    if (behavior.extraData) {
      gameObject = changeStateBehaviorData(
        gameObject,
        behaviorName,
        "extraData",
        _ => behavior.extraData
      );
    }
  }

  saveGame = replaceGameObject(saveGame, gameObject);

  return saveGame;
}
