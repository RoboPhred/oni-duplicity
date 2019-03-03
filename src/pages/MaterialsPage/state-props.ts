import { createSelector } from "reselect";
import {
  SimHashNames,
  getBehavior,
  PrimaryElementBehavior,
  StorageBehavior,
  SimHashes
} from "oni-save-parser";
import { find } from "lodash-es";

import { saveGameSelector } from "@/services/oni-save/selectors/save-game";
import { AppState } from "@/state";

export interface MaterialDataRow {
  elementName: string;
  freeStandingCount: number;
  freeStandingGrams: number;
  storageCount: number;
  storageGrams: number;
}

const materialDataSelector = createSelector(
  saveGameSelector,
  saveGame => {
    if (!saveGame) {
      return [];
    }

    const rowsByElement: Record<string, MaterialDataRow> = {};

    function getElementRow(name: string) {
      if (!rowsByElement[name]) {
        rowsByElement[name] = {
          elementName: name,
          freeStandingCount: 0,
          freeStandingGrams: 0,
          storageCount: 0,
          storageGrams: 0
        };
      }
      return rowsByElement[name];
    }

    for (const elementName of SimHashNames) {
      const group = find(saveGame.gameObjects, x => x.name === elementName);
      if (!group) {
        continue;
      }

      const row = getElementRow(elementName);

      for (const gameObject of group.gameObjects) {
        const primaryElement = getBehavior(gameObject, PrimaryElementBehavior);
        if (!primaryElement) {
          continue;
        }

        row.freeStandingCount++;
        row.freeStandingGrams += primaryElement.templateData.Units;
      }
    }

    for (const group of saveGame.gameObjects) {
      // TODO: Only search own storage containers.
      for (const gameObject of group.gameObjects) {
        const storage = getBehavior(gameObject, StorageBehavior);
        if (!storage) {
          continue;
        }

        for (const item of storage.extraData) {
          const primaryElement = getBehavior(item, PrimaryElementBehavior);
          if (!primaryElement) {
            continue;
          }

          const elementName = SimHashes[primaryElement.templateData.ElementID];
          if (!elementName) {
            continue;
          }
          const row = getElementRow(elementName);

          row.storageCount++;
          row.storageGrams += primaryElement.templateData.Units;
        }
      }
    }

    return Object.keys(rowsByElement).map(k => rowsByElement[k]);
  }
);

export default function mapStateToProps(state: AppState) {
  return {
    materialData: materialDataSelector(state)
  };
}
export type StateProps = ReturnType<typeof mapStateToProps>;
