import { AnyAction } from "redux";
import { SaveGame } from "oni-save-parser";
import { merge } from "lodash";

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

  let { gameObjectId, behaviorId, target, value, merge } = action.payload;

  return tryModifySaveGame(state, saveGame =>
    performModifyBehavior(
      saveGame,
      gameObjectId,
      behaviorId,
      target,
      value,
      merge
    )
  );
}

function performModifyBehavior(
  saveGame: SaveGame,
  gameObjectId: number,
  behaviorName: string,
  target: BehaviorDataTarget,
  value: any,
  mergeData: boolean
) {
  let gameObject = requireGameObject(saveGame, gameObjectId);

  function performMerge(original: any) {
    return mergeData ? merge({}, original, value) : { ...original, ...value };
  }

  switch (target) {
    case BehaviorDataTarget.Template:
      gameObject = changeStateBehaviorData(
        gameObject,
        behaviorName,
        "templateData",
        performMerge
      );
      break;
    case BehaviorDataTarget.Extra:
      gameObject = changeStateBehaviorData(
        gameObject,
        behaviorName,
        "extraData",
        performMerge
      );
      break;
  }

  saveGame = replaceGameObject(saveGame, gameObject);
  return saveGame;
}
