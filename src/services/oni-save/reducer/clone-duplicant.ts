import { AnyAction } from "redux";
import produce from "immer";
import { find, findIndex } from "lodash-es";

import { defaultOniSaveState, OniSaveState } from "../state";
import { isCloneDuplicantAction } from "../actions/clone-duplicant";
import { gameObjectsByIdSelector } from "../selectors/save-game";
import {
  KPrefabIDBehavior,
  GameObject,
  getBehavior,
  MinionIdentityBehavior
} from "oni-save-parser";

const BEHAVIOR_BLACKLIST = ["StateMachineController", "Navigator"];
KPrefabIDBehavior;

export default function cloneDuplicantReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isCloneDuplicantAction(action)) {
    return state;
  }

  if (!state.saveGame) {
    return state;
  }

  const { gameObjectId } = action.payload;

  const gameObjectsById = gameObjectsByIdSelector.local(state);
  if (!gameObjectId || !gameObjectsById[gameObjectId]) {
    return state;
  }
  const sourceGameObject = gameObjectsById[gameObjectId];

  return produce(state, draft => {
    const minionObjects = find(
      draft.saveGame!.gameObjects,
      x => x.name === "Minion"
    );
    if (!minionObjects) {
      return;
    }

    const newMinion: GameObject = {
      ...sourceGameObject,
      behaviors: sourceGameObject.behaviors.filter(
        behavior => BEHAVIOR_BLACKLIST.indexOf(behavior.name) === -1
      )
    };

    const idBehaviorIndex = findIndex(
      newMinion.behaviors,
      x => x.name === KPrefabIDBehavior
    );
    if (idBehaviorIndex === -1) {
      return;
    }

    const newPrefabId = draft.saveGame!.settings.nextUniqueID;
    draft.saveGame!.settings.nextUniqueID += 1;

    newMinion.behaviors[idBehaviorIndex] = {
      ...newMinion.behaviors[idBehaviorIndex],
      templateData: {
        ...newMinion.behaviors[idBehaviorIndex].templateData,
        InstanceID: newPrefabId
      }
    };

    const identityBehaviorIndex = findIndex(
      newMinion.behaviors,
      x => x.name === MinionIdentityBehavior
    );
    if (identityBehaviorIndex !== -1) {
      newMinion.behaviors[identityBehaviorIndex] = {
        ...newMinion.behaviors[identityBehaviorIndex],
        templateData: {
          ...newMinion.behaviors[identityBehaviorIndex].templateData,
          name: `Clone of ${
            newMinion.behaviors[identityBehaviorIndex].templateData.name
          }`
        }
      };
    }

    minionObjects.gameObjects.push(newMinion);

    draft.isModified = true;
  });
}
