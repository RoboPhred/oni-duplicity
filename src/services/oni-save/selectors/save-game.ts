import { AppState } from "@/state";
import { createSelector } from "reselect";
import { GameObject, getBehavior, KPrefabIDBehavior } from "oni-save-parser";

export const saveGameSelector = (state: AppState) =>
  state.services.oniSave.saveGame;

export const gameObjectGroupsSelector = (state: AppState) => {
  const saveGame = saveGameSelector(state);
  if (!saveGame) {
    return null;
  }

  return saveGame.gameObjects;
};

export const gameObjectsByIdSelector = createSelector(
  gameObjectGroupsSelector,
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
        gameObjectsById[idBehavior.templateData.InstanceID] = gameObject;
      }
    }

    return gameObjectsById;
  }
);
