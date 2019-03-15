import { createSelector } from "reselect";
import { GameObject, getBehavior, KPrefabIDBehavior } from "oni-save-parser";

import { OniSaveState } from "../state";

import { createServiceSelector } from "./utils";

export const saveGameSelector = createServiceSelector(
  (state: OniSaveState) => state.saveGame
);

export const isMockSelector = createServiceSelector(
  (state: OniSaveState) => state.isMock
);

export const isSaveModifiedSelector = createServiceSelector(
  (state: OniSaveState) => state.isModified
);

export const gameObjectGroupsSelector = createServiceSelector(
  (state: OniSaveState) => {
    const saveGame = saveGameSelector.local(state);
    if (!saveGame) {
      return null;
    }

    return saveGame.gameObjects;
  }
);

export const gameObjectTypesByIdSelector = createServiceSelector(
  createSelector(
    gameObjectGroupsSelector.local,
    groups => {
      const gameObjectTypesById: Record<number, string> = {};

      if (!groups) {
        return gameObjectTypesById;
      }

      for (const group of groups) {
        for (const gameObject of group.gameObjects) {
          const idBehavior = getBehavior(gameObject, KPrefabIDBehavior);
          if (!idBehavior) {
            continue;
          }
          const { InstanceID } = idBehavior.templateData;
          gameObjectTypesById[InstanceID] = group.name;
        }
      }

      return gameObjectTypesById;
    }
  )
);

export const gameObjectsByIdSelector = createServiceSelector(
  createSelector(
    gameObjectGroupsSelector.local,
    groups => {
      const gameObjectsById: Record<number, GameObject> = {};

      if (!groups) {
        return gameObjectsById;
      }

      for (const group of groups) {
        for (const gameObject of group.gameObjects) {
          const idBehavior = getBehavior(gameObject, KPrefabIDBehavior);
          if (!idBehavior) {
            continue;
          }
          const { InstanceID } = idBehavior.templateData;
          gameObjectsById[InstanceID] = gameObject;
        }
      }

      return gameObjectsById;
    }
  )
);
