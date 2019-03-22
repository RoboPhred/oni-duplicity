import { AnyAction } from "redux";
import produce from "immer";
import { find } from "lodash-es";
import {
  KPrefabIDBehavior,
  GameObject,
  MinionIdentityBehavior,
  getBehavior,
  GameObjectBehavior
} from "oni-save-parser";

import { defaultOniSaveState, OniSaveState } from "../state";
import { isCloneDuplicantAction } from "../actions/clone-duplicant";
import { gameObjectsByIdSelector } from "../selectors/game-objects";

import { changeStateBehaviorData } from "./utils";

const BEHAVIOR_BLACKLIST = ["StateMachineController", "Navigator"];
function shouldCloneBehavior(behavior: GameObjectBehavior): boolean {
  return BEHAVIOR_BLACKLIST.indexOf(behavior.name) === -1;
}

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

  let newMinion: GameObject | null = {
    ...sourceGameObject,
    behaviors: sourceGameObject.behaviors.filter(shouldCloneBehavior)
  };

  // Because we shallow clone behaviors, modifying the reference
  //  with immer will modify both the original and the modified minion.
  // Instead, we produce new immutable copies of the game object as we go.

  // Give the new duplicant a new PrefabID
  const newPrefabId = state.saveGame!.settings.nextUniqueID;
  newMinion = changeStateBehaviorData(
    newMinion,
    KPrefabIDBehavior,
    "templateData",
    {
      InstanceID: newPrefabId
    }
  );
  if (!newMinion) {
    return state;
  }

  // Look up the old duplicant's name
  const oldIdentity = getBehavior(sourceGameObject, MinionIdentityBehavior);
  if (!oldIdentity) {
    return state;
  }

  // Give the new duplicate a new name to differentiate it.
  newMinion = changeStateBehaviorData(
    newMinion,
    MinionIdentityBehavior,
    "templateData",
    {
      name: `Clone of ${oldIdentity.templateData.name}`
    }
  );
  if (!newMinion) {
    return state;
  }

  return produce(state, draft => {
    const saveGame = draft.saveGame!;

    const minionObjects = find(saveGame.gameObjects, x => x.name === "Minion");
    if (!minionObjects) {
      return;
    }

    minionObjects.gameObjects.push(newMinion!);

    // We used the next ID for the duplicant, so we
    //  need to increment the counter
    saveGame.settings.nextUniqueID += 1;

    draft.isModified = true;
  });
}
