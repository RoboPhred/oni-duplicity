import {
  SaveGame,
  GameObjectBehavior,
  GameObject,
  GameObjectGroup
} from "oni-save-parser";

import { get, isObject } from "lodash-es";

import { EditMode, SaveItemBreadcrumb } from "./types";

import {
  SaveStructureDef,
  getSaveStructureDef,
  walkSaveStructurePath,
  ValueSelector,
  SaveStructureItemType,
  SaveStructurePrimaryType
} from "./structure";

export function getSaveItemType(
  path: string[],
  saveGame: SaveGame
): SaveStructureItemType | null {
  const def = getSaveStructureDef(path, saveGame);
  const type = (def && def.$type) || null;
  if (type == null) {
    return null;
  }
  let subType = (def && def.$subType) || null;
  if (subType) {
    subType = resolveValueSelector(subType, path, saveGame);
  }
  return {
    type,
    subType: subType || undefined
  };
}

export interface FoundSaveItem<T> {
  path: string[];
  item: T;
}
/**
 * Gets the deepest save item of the given type
 */
export function getLastSaveItemOfType(
  type: "game-object-group",
  path: string[],
  saveGame: SaveGame
): FoundSaveItem<GameObjectGroup> | undefined;
export function getLastSaveItemOfType(
  type: "game-object",
  path: string[],
  saveGame: SaveGame
): FoundSaveItem<GameObject> | undefined;
export function getLastSaveItemOfType(
  type: "game-object-behavior",
  path: string[],
  saveGame: SaveGame
): FoundSaveItem<GameObjectBehavior> | undefined;
export function getLastSaveItemOfType<T = any>(
  type: SaveStructurePrimaryType,
  path: string[],
  saveGame: SaveGame
): FoundSaveItem<T> | undefined;
export function getLastSaveItemOfType<T>(
  type: SaveStructurePrimaryType,
  path: string[],
  saveGame: SaveGame
): FoundSaveItem<T> | undefined {
  let foundPath: string[] | undefined;
  for (const pair of walkSaveStructurePath(path, saveGame)) {
    if (pair.def.$type === type) {
      foundPath = pair.path;
    }
  }

  if (foundPath) {
    const item = foundPath.length > 0 ? get(saveGame, foundPath) : saveGame;
    return {
      path: foundPath,
      item
    };
  }

  return undefined;
}

export function getLastSaveItemOfSubType<T>(
  type: SaveStructurePrimaryType,
  subType: string,
  path: string[],
  saveGame: SaveGame
): FoundSaveItem<T> | undefined {
  let foundPath: string[] | undefined;
  for (const pair of walkSaveStructurePath(path, saveGame)) {
    const pairSubType = pair.def.$subType
      ? resolveValueSelector(pair.def.$subType, pair.path, saveGame)
      : null;
    if (pair.def.$type === type && pairSubType === subType) {
      foundPath = pair.path;
    }
  }

  if (foundPath) {
    const item = foundPath.length > 0 ? get(saveGame, foundPath) : saveGame;
    return {
      path: foundPath,
      item
    };
  }

  return undefined;
}

// const GAME_OBJECT_GROUP_PATH_ROOT = ["gameObjects", "*"];
// export function getPathGameObjectGroup(
//   path: string[],
//   saveGame: SaveGame
// ): GameObjectGroup | null {
//   if (path.length < GAME_OBJECT_GROUP_PATH_ROOT.length) {
//     return null;
//   }

//   path = path.slice(0, GAME_OBJECT_GROUP_PATH_ROOT.length);

//   if (
//     !path.every((x, i) => comparePathMatch(x, i, GAME_OBJECT_GROUP_PATH_ROOT))
//   ) {
//     return null;
//   }

//   return get(saveGame, path);
// }

// const GAME_OBJECT_PATH_ROOT = ["gameObjects", "*", "gameObject", "*"];
// export function getPathGameObject(
//   path: string[],
//   saveGame: SaveGame
// ): GameObject | null {
//   if (path.length < GAME_OBJECT_PATH_ROOT.length) {
//     return null;
//   }

//   path = path.slice(0, GAME_OBJECT_PATH_ROOT.length);

//   if (!path.every((x, i) => comparePathMatch(x, i, GAME_OBJECT_PATH_ROOT))) {
//     return null;
//   }

//   return get(saveGame, path);
// }

// const GAME_OBJECT_BEHAVIOR_PATH_ROOT = [
//   "gameObjects",
//   "*",
//   "gameObject",
//   "*",
//   "behaviors",
//   "*"
// ];
// export function getPathBehavior(
//   path: string[],
//   saveGame: SaveGame
// ): GameObjectBehavior | null {
//   if (path.length < GAME_OBJECT_BEHAVIOR_PATH_ROOT.length) {
//     return null;
//   }

//   path = path.slice(0, GAME_OBJECT_BEHAVIOR_PATH_ROOT.length);

//   if (
//     !path.every((x, i) =>
//       comparePathMatch(x, i, GAME_OBJECT_BEHAVIOR_PATH_ROOT)
//     )
//   ) {
//     return null;
//   }

//   return get(saveGame, path);
// }

// function comparePathMatch(part: string, index: number, match: string[]) {
//   if (match[index] === "*") return true;
//   if (part === match[index]) return true;
//   return false;
// }

export function getSaveItemTitle(path: string[], saveGame: SaveGame): string {
  const def = getSaveStructureDef(path, saveGame);
  let nameSource: string | false | undefined;
  if (def) {
    const nameProducer = def.$uiPathName;
    if (nameProducer) {
      nameSource = resolveValueSelector(nameProducer, path, saveGame);
    }
  }

  // TODO: Object might opt out of a path entry with uiPathName: false
  //  What do we do in this case?
  //  For now, we just return the absolute path.
  return nameSource || path[path.length - 1];
}

export function getSaveItemBreadcrumb(
  path: string[],
  saveGame: SaveGame
): SaveItemBreadcrumb[] {
  const breadcrumbs: SaveItemBreadcrumb[] = [];
  for (const structurePath of walkSaveStructurePath(path, saveGame)) {
    const { def, path: defPath } = structurePath;
    let title: string | false = false;
    const nameProducer = def.$uiPathName;
    if (nameProducer) {
      title = resolveValueSelector(nameProducer, defPath, saveGame);
    } else if (nameProducer === false) {
      // Opting out of a path entry.
      continue;
    } else {
      title = defPath[defPath.length - 1];
    }

    if (title) {
      breadcrumbs.push({
        title,
        path: defPath
      });
    }
  }

  return breadcrumbs;
}

export function getSaveItemEditValue(path: string[], saveGame: SaveGame) {
  return path.length > 0 ? get(saveGame, path) : saveGame;
}

export function getSaveItemChildPaths(
  path: string[],
  saveGame: SaveGame,
  editMode: EditMode
): string[][] {
  const def = getSaveStructureDef(path, saveGame);
  const childPaths = collectChildPaths(path, saveGame, def, editMode);
  return childPaths;
}

/**
 * Determine the child values for the given value.
 * @param path The path to the value whose children to determine
 * @param saveGame The oni save game structure
 * @param def The definition of the value whose children to determine
 * @param editMode The current edit mode.
 * @returns A collection of absolute save game paths for the child values of this value.
 */
function collectChildPaths(
  path: string[],
  saveGame: SaveGame,
  def: SaveStructureDef | null,
  editMode: EditMode
): string[][] {
  let uiChildren = def ? def.$uiChildren : null;

  const value = path.length > 0 ? get(saveGame, path) : saveGame;

  if (uiChildren) {
    uiChildren = resolveValueSelector(uiChildren, path, saveGame);
  }

  if (uiChildren === false) {
    // Explicitly no children.
    return [];
  }

  if (uiChildren == null && def) {
    // TODO: Not sure if this is a good idea, trying it out.
    // Explicit structure children are candidates for children.

    // Only process def if it is not advanced, or we are in advanced mode.
    // Determine the save structure keys we can work off of.
    const defKeys: string[] = Object.keys(def).filter(x => x[0] !== "$");
    if (defKeys.indexOf("*") !== -1) {
      // Def knows about all child keys.  Probably an array or map.
      uiChildren = Object.keys(value).map(x => [x]);
    } else if (defKeys.length > 0) {
      // We have known child keys, offer them up.
      uiChildren = defKeys.map(x => [x]);
    }
  }

  // Failed to find any children, attempt to auto-determine them.
  if (uiChildren == null) {
    uiChildren = collectAutoChildPaths(path, saveGame, editMode);
  }

  // Make the path absolute
  uiChildren = uiChildren ? uiChildren.map(x => [...path, ...x]) : [];

  if (uiChildren) {
    // Check for editMode visibility.
    uiChildren = uiChildren.filter(path => {
      const childDef = getSaveStructureDef(path, saveGame);
      return checkEditMode(path, saveGame, childDef, editMode);
    });
  }

  return uiChildren;
}

function checkEditMode(
  path: string[],
  saveGame: SaveGame,
  def: SaveStructureDef | null,
  editMode: EditMode
): boolean {
  if (editMode === "advanced") {
    return true;
  }

  let advancedProducer = def && def.$advanced;
  if (advancedProducer == null) {
    // Unknown objects are implicitly advanced.
    return true;
  }
  let advanced = resolveValueSelector(advancedProducer, path, saveGame);

  return !advanced;
}

function collectAutoChildPaths(
  saveGamePath: string[],
  oniSave: SaveGame,
  editMode: EditMode
): string[][] {
  if (editMode !== "advanced") {
    // Do not auto-determine anything when not in advanced mode.
    return [];
  }

  const value = saveGamePath.length > 0 ? get(oniSave, saveGamePath) : oniSave;
  let uiChildren: string[][] | null = null;
  if (isObject(value)) {
    // Target is an object, offer up all child objects.
    uiChildren = Object.keys(value)
      .filter(x => isImplicitChild(value[x]))
      .map(x => [x]);
  } else if (Array.isArray(value)) {
    // Target is an array, offer up all array items.
    uiChildren = value.filter(isImplicitChild).map((_, i) => [`${i}`]);
  }

  return uiChildren || [];
}

function isImplicitChild(value: any): boolean {
  return isObject(value);
}

function resolveValueSelector<T>(
  selector: ValueSelector<T>,
  path: string[],
  oniSave: SaveGame
): T {
  if (typeof selector === "function") {
    const value = path.length > 0 ? get(oniSave, path) : oniSave;
    return selector(value, path, oniSave);
  }
  return selector as T;
}
