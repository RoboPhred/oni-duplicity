import { isObject } from "lodash-es";
import { SaveGame } from "oni-save-parser";
import naturalCompare from "string-natural-compare";

import { getSaveStructureItem } from "./save-structure";

export function getSaveItemTitle(
  value: any,
  path: string[],
  saveGame?: SaveGame | null
) {
  if (saveGame) {
    const structure = getSaveStructureItem(path, saveGame);
    if (structure && structure.$title) {
      return structure.$title(value);
    }
  }

  if (value === undefined) {
    return "[no data]";
  }

  if (value === null) {
    return "[null]";
  }

  if (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === "string"
  ) {
    // A tuple.  Probably.
    return value[0];
  }

  if (isObject(value)) {
    // A behavior.  With any luck.
    return value.name || value.type || undefined;
  }

  return String(value);
}

export function getSaveItemChildPaths(value: any, path: string[]): string[][] {
  if (!isObject(value)) {
    return [];
  }
  const expandableKeys = Object.keys(value)
    .filter(valueKey => isObject(value[valueKey]))
    .sort(naturalCompare);
  return expandableKeys.map(x => [...path, x]);
}
