import produce from "immer";
import { AnyAction } from "redux";
import { getBehavior } from "oni-save-parser";

import { OniSaveState, defaultOniSaveState } from "../state";
import { getGameObjectById } from "../utils";

import { isPasteBehaviorsAction } from "../actions/paste-behaviors";

import { gameObjectTypesByIdSelector } from "../selectors/save-game";

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
