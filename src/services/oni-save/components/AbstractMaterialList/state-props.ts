import {
  SimHashNames,
  getBehavior,
  PrimaryElementBehavior,
  GameObject,
  StorageBehavior
} from "oni-save-parser";
import { createSelector } from "reselect";

import { saveGameSelector } from "../../selectors/save-game";

import { MaterialListItem } from "./props";
import { AppState } from "@/state";

// TODO: Seeds, clothing, other sweepables
const MaterialGameObjectTypes = [...SimHashNames];

const materialsSelector = createSelector(
  saveGameSelector,
  saveGame => {
    if (!saveGame) {
      return [];
    }

    const rowsByMaterial: Record<string, MaterialListItem> = {};

    function getMaterialRow(name: string) {
      if (!rowsByMaterial[name]) {
        rowsByMaterial[name] = {
          name,
          looseCount: 0,
          looseGrams: 0,
          storedCount: 0,
          storedGrams: 0
        };
      }
      return rowsByMaterial[name];
    }

    function addMaterialObject(
      name: string,
      gameObject: GameObject,
      loose: boolean
    ) {
      const row = getMaterialRow(name);
      const elementBehavior = getBehavior(gameObject, PrimaryElementBehavior);
      if (!elementBehavior) {
        return;
      }

      const { Units } = elementBehavior.templateData;
      if (loose) {
        row.looseCount++;
        row.looseGrams += Units;
      } else {
        row.storedCount++;
        row.storedGrams += Units;
      }
    }

    for (const group of saveGame.gameObjects) {
      const loose = MaterialGameObjectTypes.indexOf(group.name) !== -1;

      for (const gameObject of group.gameObjects) {
        if (loose) {
          addMaterialObject(group.name, gameObject, true);
        } else {
          const storage = getBehavior(gameObject, StorageBehavior);
          if (!storage) {
            continue;
          }
          for (const item of storage.extraData) {
            const primaryElement = getBehavior(item, PrimaryElementBehavior);
            if (!primaryElement) {
              continue;
            }

            addMaterialObject(item.name, gameObject, false);
          }
        }
      }
    }

    return Object.keys(rowsByMaterial).map(k => rowsByMaterial[k]);
  }
);

export default function mapStateToProps(state: AppState) {
  return {
    materials: materialsSelector(state)
  };
}
export type StateProps = ReturnType<typeof mapStateToProps>;
