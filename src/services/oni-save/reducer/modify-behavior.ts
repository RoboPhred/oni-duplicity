import produce from "immer";
import { AnyAction } from "redux";
import { getBehavior } from "oni-save-parser";

import { OniSaveState, defaultOniSaveState } from "../state";
import { getGameObjectById } from "../utils";

import {
  isModifyBehaviorAction,
  BehaviorDataTarget
} from "../actions/modify-behavior";

export default function modifyBehaviorReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isModifyBehaviorAction(action)) {
    return state;
  }

  if (!state.saveGame) {
    return state;
  }

  let { gameObjectId, behaviorId, target, value } = action.payload;

  return produce(state, draft => {
    const gameObject = getGameObjectById(draft.saveGame!, gameObjectId);
    if (!gameObject) {
      return;
    }

    const behavior = getBehavior(gameObject, behaviorId);
    if (!behavior) {
      return;
    }

    if (target === BehaviorDataTarget.Template) {
      behavior.templateData = {
        ...behavior.templateData,
        ...value
      };
    } else if (target === BehaviorDataTarget.Extra) {
      behavior.extraData = {
        ...behavior.extraData,
        ...value
      };
    }

    draft.isModified = true;
  });
}
