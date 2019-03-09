import { AnyAction } from "redux";
import { findIndex, find } from "lodash-es";
import produce from "immer";

import { OniSaveState, defaultOniSaveState } from "../state";

import { isChangeGameObjectTypeAction } from "../actions/change-gameobject-type";
import { gameObjectTypesByIdSelector } from "../selectors/save-game";
import { getBehavior, KPrefabIDBehavior } from "oni-save-parser";

export default function changeGameObjectTypeReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isChangeGameObjectTypeAction(action)) {
    return state;
  }

  if (!state.saveGame) {
    return state;
  }

  const { gameObjectId, gameObjectType } = action.payload;

  const typesById = gameObjectTypesByIdSelector.local(state);
  if (!typesById || !typesById[gameObjectId]) {
    return state;
  }

  const oldType = typesById[gameObjectId];

  return produce(state, draft => {
    const saveGame = draft.saveGame!;
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

    let newGroup = find(saveGame.gameObjects, x => x.name === gameObjectType);
    if (!newGroup) {
      newGroup = {
        name: gameObjectType,
        gameObjects: []
      };
      saveGame.gameObjects.push(newGroup);
    }
    newGroup.gameObjects.push(gameObject);
  });
}
