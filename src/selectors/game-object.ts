import { createSelector } from "reselect";

import { GameObject } from "oni-save-parser";

import { get } from "lodash-es";

import { getLastSaveItemOfType } from "@/services/save-structure";

import selectedPath from "./selected-path";
import oniSave from "./oni-save";

/**
 * Gets the path to the deepest game object in the selected path.
 *
 */
export const getGameObjectPathInSelection = createSelector(
  selectedPath,
  oniSave,
  (path, oniSave) => {
    if (!path || !oniSave) {
      return null;
    }

    const found = getLastSaveItemOfType("game-object", path, oniSave);
    if (!found) {
      return null;
    }
    return found.path;
  }
);

export const getSelectedGameObject = createSelector(
  oniSave,
  getGameObjectPathInSelection,
  (oniSave, path) => {
    if (!oniSave || !path) {
      return null;
    }

    return get(oniSave, path) as GameObject;
  }
);

export const getSelectedGameObjectPosition = createSelector(
  getSelectedGameObject,
  gameObject => {
    if (!gameObject) {
      return null;
    }
    return gameObject.position;
  }
);

export const getSelectedGameObjectScale = createSelector(
  getSelectedGameObject,
  gameObject => {
    if (!gameObject) {
      return null;
    }
    return gameObject.scale;
  }
);

export default getSelectedGameObject;
