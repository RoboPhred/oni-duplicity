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

const gameObjectIdTypes: Record<number, string> = {};
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
        const { InstanceID } = idBehavior.templateData;
        if (gameObjectsById[InstanceID]) {
          console.log(
            "ID CONFLICT",
            InstanceID,
            gameObjectIdTypes[InstanceID],
            " <=> ",
            group.name
          );
        }
        gameObjectIdTypes[InstanceID] = group.name;
        gameObjectsById[InstanceID] = gameObject;
      }
    }

    return gameObjectsById;
  }
);
