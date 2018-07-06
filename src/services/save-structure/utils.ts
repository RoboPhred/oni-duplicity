import { SaveGame } from "oni-save-parser";

import { get, isObject } from "lodash-es";

import { EditMode, SaveItemBreadcrumb } from "./types";

import {
  SaveStructureDef,
  getSaveStructureDef,
  walkSaveStructurePath
} from "./structure";

//===============================================================
// -- Old functions

export function getSaveItemTitle(path: string[], saveGame: SaveGame): string {
  const def = getSaveStructureDef(path, saveGame);
  let nameSource: string | false | undefined;
  if (def) {
    const nameProducer = def.$uiPathName;
    if (typeof nameProducer === "function") {
      const value = path.length > 0 ? get(saveGame, path) : saveGame;
      nameSource = nameProducer(value);
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
      title = nameProducer(value) || false;
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
  saveGame: SaveGame
): string[][] {
  const editMode = "advanced";
  const def = getSaveStructureDef(path, saveGame);
  const childPaths = def
    ? collectChildPaths(path, saveGame, def, editMode)
    : collectAutoChildPaths(path, saveGame, editMode);
  return childPaths || [];
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
//===============================================================

// function resolveUiPath(uiPath: string[], saveGame: SaveGame): string[] {
//   let currentDef: SaveStructureDef = saveStructure;
//   let currentValue: any = null;
//   let saveItemPath: string[] = [];

//   const rootUiName = resolveUiName(currentDef, "saveGame", saveGame);
//   if (rootUiName !== uiPath[0]) {
//     return [];
//   }

//   currentValue = saveGame;
//   // Do not push to saveItemPath, as it is relative to the saveGame directly.
//   //  This contrasts with uiPath, which has a first element indicating the save game.

//   for (const pathPart of uiPath.slice(1)) {
//     // TODO: some weird deep search, where paths
//     //  might be $uiPathName values or might be keys in the saveGame path.
//     const childPaths = collectChildPaths
//   }
// }

// function resolveUiName(def: SaveStructureDef, saveItemKey: string, value: any) {
//   const uiPathName = def.$uiPathName;
//   // Should be a switch statement; typescript says no.
//   if (typeof uiPathName === "function") {
//     return uiPathName(value);
//   } else if (typeof uiPathName === "string") {
//     return uiPathName;
//   } else {
//     return saveItemKey;
//   }
// }

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
  def: SaveStructureDef,
  editMode: EditMode
): string[][] | null {
  let uiChildren = def.$uiChildren;

  if (typeof uiChildren === "function") {
    const value =
      saveGamePath.length > 0 ? get(oniSave, saveGamePath) : oniSave;
    uiChildren = uiChildren(value);
  }

  if (uiChildren === false) {
    // Explicitly no children.
    return null;
  }

  if (uiChildren == null) {
    return collectAutoChildPaths(saveGamePath, oniSave, editMode);
  }

  return uiChildren.map(x => [...saveGamePath, ...x]);
}

function collectAutoChildPaths(
  saveGamePath: string[],
  oniSave: SaveGame,
  editMode: EditMode
): string[][] | null {
  // Children unspecified.
  if (editMode !== "advanced") {
    // Only show auto-children in advanced mode.
    return null;
  }

  const value = saveGamePath.length > 0 ? get(oniSave, saveGamePath) : oniSave;
  let uiChildren: string[][] | null = null;
  if (isObject(value)) {
    // automatically determine all child objects.
    uiChildren = Object.keys(value)
      .filter(x => isImplicitChild(value[x]))
      .map(x => [x]);
  } else if (Array.isArray(value)) {
    uiChildren = value.filter(isImplicitChild).map((_, i) => [`${i}`]);
  }

  if (uiChildren) {
    return uiChildren.map(x => [...saveGamePath, ...x]);
  }

  return null;
}

function isImplicitChild(value: any): boolean {
  return isObject(value);
}
