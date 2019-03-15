import { AnyAction } from "redux";
import { findIndex, find, startsWith } from "lodash-es";
import produce from "immer";
import {
  GeyserType,
  HashedString,
  GameObjectGroup,
  SaveGame
} from "oni-save-parser";

import { OniSaveState, defaultOniSaveState } from "../state";

import { isChangeGeyserTypeAction } from "../actions/change-geyser-type";
import { gameObjectTypesByIdSelector } from "../selectors/save-game";
import {
  getBehavior,
  KPrefabIDBehavior,
  GeyserBehavior
} from "oni-save-parser";

export default function changeGeyserTypeReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isChangeGeyserTypeAction(action)) {
    return state;
  }

  if (!state.saveGame) {
    return state;
  }

  const { gameObjectId, geyserType } = action.payload;

  const typesById = gameObjectTypesByIdSelector.local(state);
  if (!typesById || !typesById[gameObjectId]) {
    return state;
  }

  const oldType = typesById[gameObjectId];
  if (!startsWith(oldType, "GeyserGeneric_")) {
    return state;
  }

  return produce(state, draft => {
    // Force un-type the draft object back to SaveGame
    //  to avoid type errors with symbol stripping from ArrayBuffer
    const saveGame = draft.saveGame! as SaveGame;

    const groupIndex = findIndex(saveGame.gameObjects, x => x.name === oldType);
    if (groupIndex === -1) {
      return;
    }
    const oldGroup = saveGame.gameObjects[groupIndex];

    const oldIndex = findIndex(oldGroup.gameObjects, gameObject => {
      const idBehavior = getBehavior(gameObject, KPrefabIDBehavior);
      if (!idBehavior) {
        return false;
      }
      return idBehavior.templateData.InstanceID === gameObjectId;
    });
    if (oldIndex === -1) {
      return;
    }

    const gameObject = oldGroup.gameObjects.splice(oldIndex, 1)[0];

    const geyserBehavior = getBehavior(gameObject, GeyserBehavior);
    if (!geyserBehavior || !geyserBehavior.templateData.configuration) {
      return;
    }
    geyserBehavior.templateData.configuration.typeId = HashedString(geyserType);

    const newObjectType = `GeyserGeneric_${geyserType}`;
    let newGroup = find(saveGame.gameObjects, x => x.name === newObjectType);
    if (!newGroup) {
      newGroup = {
        name: newObjectType,
        gameObjects: []
      };
      saveGame.gameObjects.push(newGroup);
    }
    newGroup.gameObjects.push(gameObject);

    draft.isModified = true;
  });
}
