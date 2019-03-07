import produce from "immer";
import { AnyAction } from "redux";
import { getBehavior } from "oni-save-parser";

import { OniSaveState, defaultOniSaveState } from "../state";
import { getGameObjectById } from "../utils";

import { isMergeBehaviorsAction } from "../actions/merge-behaviors";

import { gameObjectTypesByIdSelector } from "../selectors/save-game";

export default function mergeBehaviorsReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isMergeBehaviorsAction(action)) {
    return state;
  }

  const { gameObjectId, behaviors } = action.payload;

  const typesById = gameObjectTypesByIdSelector.local(state);
  if (!typesById || !typesById[gameObjectId]) {
    return state;
  }

  return produce(state, draft => {
    const gameObject = getGameObjectById(draft.saveGame!, gameObjectId);
    if (!gameObject) {
      return;
    }

    for (const behaviorName of Object.keys(behaviors)) {
      const behavior = getBehavior(gameObject, behaviorName);
      if (!behavior) {
        continue;
      }

      const copyData = behaviors[behaviorName];
      const { templateData, extraData } = copyData;
      if (templateData) {
        behavior.templateData = templateData;
      }
      if (extraData) {
        behavior.extraData = extraData;
      }
    }
  });
}
