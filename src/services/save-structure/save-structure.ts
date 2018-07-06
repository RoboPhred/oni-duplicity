import { SaveGame } from "oni-save-parser";

import { isObject } from "lodash-es";

import saveStructure from "./structure";
import { SaveStructureDef } from "./types";

export function getSaveStructureItem(
  saveGamePath: string[],
  save: SaveGame
): SaveStructureDef | null {
  let structure: SaveStructureDef = saveStructure;
  let value: any = save;
  for (let key of saveGamePath) {
    let subStructure: SaveStructureDef | undefined;
    if (isObject(structure)) {
      subStructure =
        Object.keys(structure).indexOf(key) !== -1
          ? structure[key]
          : structure["*"];
    }

    if (!subStructure) {
      return null;
    }

    // Pick the value before searching for variants.
    value = value[key];

    // Try to pick a variant if possible.
    if (subStructure.$variants) {
      const variant = subStructure.$variants.find(
        x => !x.$match || x.$match(value)
      );
      if (variant) {
        subStructure = {
          ...subStructure,
          ...variant
        } as SaveStructureDef;
      }
    }

    structure = subStructure;
  }

  return structure;
}

export function getChildStructures(def: SaveStructureDef): SaveStructureDef[] {
  return Object.keys(def)
    .filter(x => x[0] !== "$")
    .map(x => def[x]) as SaveStructureDef[];
}
