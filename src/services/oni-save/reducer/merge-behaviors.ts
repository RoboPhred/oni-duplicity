import produce from "immer";
import { AnyAction } from "redux";
import { getBehavior, SaveGame } from "oni-save-parser";

import { OniSaveState, defaultOniSaveState } from "../state";
import { getGameObjectById } from "../utils";

import { isMergeBehaviorsAction } from "../actions/merge-behaviors";

import { gameObjectTypesByIdSelector } from "../selectors/game-objects";

export default function mergeBehaviorsReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isMergeBehaviorsAction(action)) {
    return state;
  }

  if (!state.saveGame) {
    return state;
  }

  const { gameObjectId, behaviors } = action.payload;

  const typesById = gameObjectTypesByIdSelector.local(state);
  if (!typesById || !typesById[gameObjectId]) {
    return state;
  }

  return produce(state, draft => {
    // Force un-type the draft object back to SaveGame
    //  to avoid type errors with symbol stripping from ArrayBuffer
    const saveGame = draft.saveGame! as SaveGame;

    const gameObject = getGameObjectById(saveGame, gameObjectId);
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

    draft.isModified = true;
  });
}
