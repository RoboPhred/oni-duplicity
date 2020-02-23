import { createSelector } from "reselect";
import { GameObject } from "oni-save-parser";
import { flatMap, keyBy } from "lodash";

import { isNotNull } from "@/utils";

import { OniSaveState } from "../state";
import { getGameObjectId } from "../utils";

import { saveGameSelector } from "./save-game";
import { createServiceSelector } from "./utils";

export const gameObjectGroupsSelector = createServiceSelector(
  (state: OniSaveState) => {
    const saveGame = saveGameSelector.local(state);
    return saveGame ? saveGame.gameObjects : null;
  }
);

export const gameObjectTypesByIdSelector = createServiceSelector(
  createSelector(
    gameObjectGroupsSelector.local,
    groups => {
      let gameObjectTypesById: Record<number, string> = {};
      if (groups) {
        for (const group of groups) {
          const gameObjectIds = group.gameObjects
            .map(getGameObjectId)
            .filter(isNotNull);
          for (const id of gameObjectIds) {
            gameObjectTypesById[id] = group.name;
          }
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
      let gameObjectsById: Record<number, GameObject> = {};
      if (groups) {
        const gameObjects = flatMap(groups, group => group.gameObjects);
        // Object keys are always strings, but we type it as number to ensure we
        //  do not try to pass non-numeric values.
        gameObjectsById = keyBy(gameObjects, getGameObjectId) as Record<
          number,
          GameObject
        >;
      }
      return gameObjectsById;
    }
  )
);
