import { AnyAction } from "redux";
import produce from "immer";

import { OniSaveState, defaultOniSaveState } from "../state";

import {
  isModifyBehaviorAction,
  BehaviorDataTarget
} from "../actions/modify-behavior";
import {
  GameObject,
  SaveGame,
  getBehavior,
  KPrefabIDBehavior
} from "oni-save-parser";

export default function modifyOniSaveReducer(
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

// We should use the existing selector for this.
//  Currently limited by our state being the nested OniSaveState
function getGameObjectById(
  saveGame: SaveGame,
  gameObjectId: number
): GameObject | null {
  for (const group of saveGame.gameObjects) {
    for (const gameObject of group.gameObjects) {
      const idBehavior = getBehavior(gameObject, KPrefabIDBehavior);
      if (!idBehavior) {
        continue;
      }
      if (idBehavior.templateData.InstanceID === gameObjectId) {
        return gameObject;
      }
    }
  }
  return null;
}
