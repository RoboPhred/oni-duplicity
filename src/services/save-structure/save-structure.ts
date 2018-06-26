import { SaveGame } from "oni-save-parser";

import { isObject } from "lodash-es";

import saveStructure from "./structure";
import { SaveStructureItem } from "./types";

export function getSaveStructureItem(
  path: string[],
  save: SaveGame
): SaveStructureItem | null {
  let structure: SaveStructureItem = saveStructure;
  let value: any = save;
  for (let key of path) {
    let subStructure: SaveStructureItem | undefined;
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
        // TS bug: adding $variants freaks out the type system,
        //  even though TS knows it is in there due to ...subStructure
        subStructure = {
          ...subStructure,
          $variants: undefined,
          ...variant
        } as SaveStructureItem;
      }
    }

    structure = subStructure;
  }

  return structure;
}
