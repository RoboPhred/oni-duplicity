import { AnyAction } from "redux";
import { getBehavior, SaveGame, GameObject } from "oni-save-parser";

import { OniSaveState, defaultOniSaveState, BehaviorCopyData } from "../state";

import { isPasteBehaviorsAction } from "../actions/paste-behaviors";

import { gameObjectTypesByIdSelector } from "../selectors/game-objects";

import {
  requireGameObject,
  changeStateBehaviorData,
  replaceGameObject,
  tryModifySaveGame
} from "./utils";

export default function pasteBehaviorsReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isPasteBehaviorsAction(action)) {
    return state;
  }

  if (!state.copyPasteData) {
    return state;
  }

  const { gameObjectType, behaviors } = state.copyPasteData;

  const { gameObjectId } = action.payload;

  const typesById = gameObjectTypesByIdSelector.local(state);
  if (!typesById || !typesById[gameObjectId]) {
    return state;
  }
  if (gameObjectType !== typesById[gameObjectId]) {
    return state;
  }

  return tryModifySaveGame(state, saveGame =>
    performPasteBehaviors(saveGame, gameObjectId, behaviors)
  );
}

function performPasteBehaviors(
  saveGame: SaveGame,
  gameObjectId: number,
  behaviors: Record<string, BehaviorCopyData>
): SaveGame {
  let gameObject = requireGameObject(saveGame, gameObjectId);

  for (const behaviorName of Object.keys(behaviors)) {
    const behavior = getBehavior(gameObject, behaviorName);
    if (!behavior) {
      continue;
    }

    gameObject = copyBehavior(
      gameObject,
      behaviorName,
      behaviors[behaviorName]
    );
  }

  saveGame = replaceGameObject(saveGame, gameObject);
  return saveGame;
}

function copyBehavior(
  gameObject: GameObject,
  behaviorName: string,
  behavior: BehaviorCopyData
): GameObject {
  const { templateData, extraData } = behavior;

  if (templateData) {
    gameObject = changeStateBehaviorData(
      gameObject,
      behaviorName,
      "templateData",
      templateData
    );
  }

  if (extraData) {
    gameObject = changeStateBehaviorData(
      gameObject,
      behaviorName,
      "extraData",
      extraData
    );
  }

  return gameObject;
}
