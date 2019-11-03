import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import { find } from "lodash";
import { getBehavior, SpacecraftManagerBehavior } from "oni-save-parser";

import { createServiceSelector } from "./utils";
import { saveGameSelector } from "./save-game";

export const spaceManagerSelector = createServiceSelector(
  createSelector(
    saveGameSelector.local,
    saveGame => {
      if (!saveGame) {
        return null;
      }

      const saveGameGroup = find(
        saveGame.gameObjects,
        x => x.name === "SaveGame"
      );
      if (!saveGameGroup) {
        return null;
      }

      const saveGameObject = saveGameGroup.gameObjects[0];
      if (!saveGameObject) {
        return null;
      }

      const spaceBehavior = getBehavior(
        saveGameObject,
        SpacecraftManagerBehavior
      );
      if (!spaceBehavior) {
        return null;
      }

      return spaceBehavior.templateData;
    }
  )
);

export const planetIdsSelector = createSelector(
  spaceManagerSelector,
  spaceManager => {
    if (!spaceManager) {
      return [];
    }

    return spaceManager.destinations.map(x => x.id);
  }
);

export const planetSelector = createCachedSelector(
  spaceManagerSelector,
  (_: any, planetId: number) => planetId,
  (spaceManager, planetId) => {
    if (!spaceManager) {
      return null;
    }

    const planet = find(spaceManager.destinations, x => x.id === planetId);
    return planet || null;
  }
)((_: any, planetId: number) => planetId);