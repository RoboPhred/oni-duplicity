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
  walkSaveStructurePath
} from "./structure";

const GAME_OBJECT_GROUP_PATH_ROOT = ["gameObjects", "*"];
export function getPathGameObjectGroup(
  path: string[],
  saveGame: SaveGame
): GameObjectGroup | null {
  if (path.length < GAME_OBJECT_GROUP_PATH_ROOT.length) {
    return null;
  }

  path = path.slice(0, GAME_OBJECT_GROUP_PATH_ROOT.length);

  if (
    !path.every((x, i) => comparePathMatch(x, i, GAME_OBJECT_GROUP_PATH_ROOT))
  ) {
    return null;
  }

  return get(saveGame, path);
}

const GAME_OBJECT_PATH_ROOT = ["gameObjects", "*", "gameObject", "*"];
export function getPathGameObject(
  path: string[],
  saveGame: SaveGame
): GameObject | null {
  if (path.length < GAME_OBJECT_PATH_ROOT.length) {
    return null;
  }

  path = path.slice(0, GAME_OBJECT_PATH_ROOT.length);

  if (!path.every((x, i) => comparePathMatch(x, i, GAME_OBJECT_PATH_ROOT))) {
    return null;
  }

  return get(saveGame, path);
}

const GAME_OBJECT_BEHAVIOR_PATH_ROOT = [
  "gameObjects",
  "*",
  "gameObject",
  "*",
  "behaviors",
  "*"
];
export function getPathBehavior(
  path: string[],
  saveGame: SaveGame
): GameObjectBehavior | null {
  if (path.length < GAME_OBJECT_BEHAVIOR_PATH_ROOT.length) {
    return null;
  }

  path = path.slice(0, GAME_OBJECT_BEHAVIOR_PATH_ROOT.length);

  if (
    !path.every((x, i) =>
      comparePathMatch(x, i, GAME_OBJECT_BEHAVIOR_PATH_ROOT)
    )
  ) {
    return null;
  }

  return get(saveGame, path);
}

function comparePathMatch(part: string, index: number, match: string[]) {
  if (match[index] === "*") return true;
  if (part === match[index]) return true;
  return false;
}

export function getSaveItemTitle(path: string[], saveGame: SaveGame): string {
  const def = getSaveStructureDef(path, saveGame);
  let nameSource: string | false | undefined;
  if (def) {
    const nameProducer = def.$uiPathName;
    if (typeof nameProducer === "function") {
      const value = path.length > 0 ? get(saveGame, path) : saveGame;
      nameSource = nameProducer(value, path, saveGame);
    } else if (typeof nameProducer === "string") {
      nameSource = nameProducer;
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
    if (typeof nameProducer === "function") {
      const value = defPath.length > 0 ? get(saveGame, defPath) : saveGame;
      title = nameProducer(value, defPath, saveGame) || false;
    } else if (typeof nameProducer === "string") {
      title = nameProducer;
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

export function getSaveItemEditor(
  path: string[],
  saveGame: SaveGame
): string | null {
  const def = getSaveStructureDef(path, saveGame);
  return (def && def.$editor) || null;
}

export function getSaveItemEditorProps(
  path: string[],
  saveGame: SaveGame
): Record<string, any> {
  const def = getSaveStructureDef(path, saveGame);
  if (!def || !def.$editor) {
    return {};
  }

  const propFactory = def.$editorProps;
  if (!propFactory) {
    return {};
  }

  const value = path.length > 0 ? get(saveGame, path) : saveGame;
  return propFactory(value, path, saveGame);
}

/**
 * Determine the child values for the given value.
 * @param saveGamePath The path to the value whose children to determine
 * @param oniSave The oni save game structure
 * @param def The definition of the value whose children to determine
 * @param editMode The current edit mode.
 * @returns A collection of absolute save game paths for the child values of this value.
 */
function collectChildPaths(
  saveGamePath: string[],
  oniSave: SaveGame,
  def: SaveStructureDef | null,
  editMode: EditMode
): string[][] {
  let uiChildren = def ? def.$uiChildren : null;

  const value = saveGamePath.length > 0 ? get(oniSave, saveGamePath) : oniSave;

  if (typeof uiChildren === "function") {
    uiChildren = uiChildren(value);
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
    uiChildren = collectAutoChildPaths(saveGamePath, oniSave, editMode);
  }

  // Make the path absolute
  uiChildren = uiChildren ? uiChildren.map(x => [...saveGamePath, ...x]) : [];

  if (uiChildren) {
    // Check for editMode visibility.
    uiChildren = uiChildren.filter(path => {
      const childValue = get(oniSave, path);
      const childDef = getSaveStructureDef(path, oniSave);
      return checkEditMode(childValue, childDef, editMode);
    });
  }

  return uiChildren;
}

function checkEditMode(
  value: any,
  def: SaveStructureDef | null,
  editMode: EditMode
): boolean {
  if (editMode === "advanced") {
    return true;
  }

  // Unknown objects are implicitly advanced.
  let advancedProducer = def ? def.$advanced : true;
  let advanced: boolean;
  if (typeof advancedProducer === "boolean") {
    advanced = advancedProducer;
  } else if (typeof advancedProducer === "function") {
    advanced = advancedProducer(value);
  } else {
    advanced = false;
  }

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
