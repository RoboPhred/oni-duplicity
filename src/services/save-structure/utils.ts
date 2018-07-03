import { get, isObject, mapValues } from "lodash-es";
import { SaveGame } from "oni-save-parser";
import naturalCompare from "string-natural-compare";

import { getSaveStructureItem } from "./save-structure";
import { SaveStructureItem } from "@/services/save-structure/types";

export function getSaveItemTitle(path: string[], saveGame: SaveGame): string {
  const key = path.length === 0 ? "saveGame" : path[path.length - 1];
  const value = path.length === 0 ? saveGame : get(saveGame, path);

  const structure = getSaveStructureItem(path, saveGame);

  return structure && structure.$title
    ? structure.$title(value)
    : getFallbackTitle(value, key);
}

export function getSaveItemEditValue(path: string[], saveGame: SaveGame) {
  let value = path.length === 0 ? saveGame : get(saveGame, path);

  if (!value) {
    return value;
  }

  const structure = getSaveStructureItem(path, saveGame);
  if (!structure || !structure.$selectEditorValue) {
    return value;
  }

  const selectEditorValue = structure.$selectEditorValue;
  if (selectEditorValue.length === 0) {
    return value;
  }

  return get(value, selectEditorValue);
}

export function getSaveItemChildPaths(
  path: string[],
  saveGame: SaveGame
): string[][] {
  let value = path.length === 0 ? saveGame : get(saveGame, path);

  if (!isObject(value)) {
    return [];
  }

  const structure = getSaveStructureItem(path, saveGame);
  if (structure && structure.$selectChildRoot) {
    value = get(value, structure.$selectChildRoot);
    path = [...path, ...structure.$selectChildRoot];
  }

  const expandableKeys = Object.keys(value).filter(valueKey =>
    isExpandableChild(valueKey, value[valueKey], structure)
  );

  const keyTitles = mapValues(expandableKeys, key =>
    getSaveItemTitle([...path, key], saveGame)
  );

  return expandableKeys
    .sort((a: string, b: string) => naturalCompare(keyTitles[a], keyTitles[b]))
    .map(x => [...path, x]);
}

function isExpandableChild(
  key: string,
  value: any,
  parent: SaveStructureItem | null
) {
  if (!isObject(value)) {
    return false;
  }

  if (parent && parent[key] && parent[key]!.$advanced) {
    // TODO: advanced mode toggle.
    return false;
  }

  return true;
}

export function getSaveItemEditor(
  path: string[],
  saveGame: SaveGame
): string | null {
  const structure = getSaveStructureItem(path, saveGame);
  return (structure && structure.$editor) || null;
}

function getFallbackTitle(value: any, key: string): string {
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
    return value.name || value.type || `${key} [${typeof value}]`;
  }

  // A primitive
  return String(value);
}
