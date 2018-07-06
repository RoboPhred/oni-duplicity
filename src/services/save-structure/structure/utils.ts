import { SaveGame } from "oni-save-parser";

import { isObject } from "lodash-es";

import saveStructure from "./root";
import { SaveStructureDef } from "./types";

export function getSaveStructureDef(
  saveGamePath: string[],
  save: SaveGame
): SaveStructureDef | null {
  // TODO: Seems like there would be a builtin utility for this
  const iter = walkSaveStructurePath(saveGamePath, save);
  let result: IteratorResult<any>;
  do {
    result = iter.next();
  } while (!result.done);
  return result.value;
}

/**
 * Walks through a path of a save game, returning the save structure objects in order.
 * @param saveGamePath The path to walk the save structure tree to
 * @param saveGame The save game to walk.
 */
export function* walkSaveStructurePath(
  saveGamePath: string[],
  saveGame: SaveGame
): IterableIterator<{ def: SaveStructureDef; path: string[] }> {
  let structure: SaveStructureDef = saveStructure;
  let value: any = saveGame;

  yield {
    def: saveStructure,
    path: []
  };

  for (let i = 0; i < saveGamePath.length; i++) {
    const key = saveGamePath[i];

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

    yield {
      def: structure,
      path: saveGamePath.slice(0, i + 1)
    };
  }

  return structure;
}

export function getChildStructures(def: SaveStructureDef): SaveStructureDef[] {
  return Object.keys(def)
    .filter(x => x[0] !== "$")
    .map(x => def[x]) as SaveStructureDef[];
}
