import createCachedSelector from "re-reselect";

import { SaveGame } from "oni-save-parser";

import { get, isObject } from "lodash-es";

import { AppState, EditMode } from "@/state";

import oniSaveSelector from "@/selectors/oni-save-selector";
import editModeSelector from "@/selectors/edit-mode-selector";

import { SaveStructureDef } from "./types";

import saveStructure from "./structure";
import { getChildStructures } from "@/services/save-structure/save-structure";

export interface SaveStructureItemData {
  uiPath: string[];
  saveGamePath: string[];

  value: any;

  childUiPaths?: string[][] | undefined;

  editorType?: string | null;
  editorProps?: Record<string, any> | undefined;
}

const saveItemByUiPath = createCachedSelector<
  AppState,
  string[],
  SaveGame | null,
  string[],
  EditMode,
  SaveStructureItemData | null
>(
  oniSaveSelector,
  (_: AppState, uiPath: string[]) => uiPath,
  editModeSelector,
  (oniSave, uiPath, editMode: EditMode) => {
    if (!oniSave) {
      return null;
    }

    const saveGamePath = resolveUiPath(uiPath);
    const def = resolveStructureDef(saveGamePath);

    const childUiPaths = collectChildUiPaths(def);

    const data: SaveStructureItemData = {
      uiPath,
      saveGamePath,
      value: uiPath.length > 0 ? get(oniSave, uiPath) : oniSave,

      childUiPaths
    };

    return data;
  }
)((_: AppState, uiPath: string[]) => uiPath.join("."));

function resolveUiPath(uiPath: string[], saveGame: SaveGame): string[] {
  let currentDef: SaveStructureDef = saveStructure;
  let currentValue: any = null;
  let saveItemPath: string[] = [];

  const rootUiName = resolveUiName(currentDef, "saveGame", saveGame);
  if (rootUiName !== uiPath[0]) {
    return [];
  }

  currentValue = saveGame;
  // Do not push to saveItemPath, as it is relative to the saveGame directly.
  //  This contrasts with uiPath, which has a first element indicating the save game.

  for (const pathPart of uiPath.slice(1)) {
    // TODO: some weird deep search, where paths
    //  might be $uiPathName values or might be keys in the saveGame path.
  }
}

function resolveUiName(def: SaveStructureDef, saveItemKey: string, value: any) {
  const uiPathName = def.$uiPathName;
  // Should be a switch statement; typescript says no.
  if (typeof uiPathName === "function") {
    return uiPathName(value);
  } else if (typeof uiPathName === "string") {
    return uiPathName;
  } else {
    return saveItemKey;
  }
}

function resolveStructureDef(saveGamePath: string[]): SaveStructureDef | null;

function collectChildUiPaths(
  oniSave: SaveGame,
  saveGamePath: string[],
  def: SaveStructureDef
): string[][] | undefined {}
