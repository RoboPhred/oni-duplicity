import { AnyAction } from "redux";
import { getBehavior } from "oni-save-parser";

import { OniSaveState, defaultOniSaveState, BehaviorCopyData } from "../state";
import { isCopyBehaviorsAction } from "../actions/copy-behaviors";
import {
  gameObjectsByIdSelector,
  gameObjectTypesByIdSelector
} from "../selectors/game-objects";

export default function copyBehaviorsReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isCopyBehaviorsAction(action)) {
    return state;
  }

  const { gameObjectId, behaviors } = action.payload;

  const gameObjects = gameObjectsByIdSelector.local(state);
  if (!gameObjects || !gameObjects[gameObjectId]) {
    return state;
  }
  const gameObject = gameObjects[gameObjectId];

  const typesById = gameObjectTypesByIdSelector.local(state);
  if (!typesById || !typesById[gameObjectId]) {
    return state;
  }
  const gameObjectType = typesById[gameObjectId];

  const copyBehaviors: Record<string, BehaviorCopyData> = {};
  for (const behaviorName of behaviors) {
    const behavior = getBehavior(gameObject, behaviorName);
    if (!behavior) {
      continue;
    }
    copyBehaviors[behaviorName] = {
      templateData: behavior.templateData,
      extraData: behavior.extraData
    };
  }

  return {
    ...state,
    copyPasteData: {
      gameObjectType,
      behaviors: copyBehaviors
    }
  };
}
