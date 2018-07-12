import { createSelector } from "reselect";

import { GameObject } from "oni-save-parser";

import { get } from "lodash-es";

import selectedPath from "./selected-path";
import oniSave from "@/selectors/oni-save";

const GAME_OBJECT_PATH = [/gameObjects/, /.+/, /gameObjects/, /\d+/];

export const getIsGameObjectSelected = createSelector(selectedPath, path => {
  if (!path) {
    return null;
  }

  if (path.length < GAME_OBJECT_PATH.length) {
    return false;
  }

  return GAME_OBJECT_PATH.every((x, i) => x.test(path[i]));
});

export const getSelectedGameObjectPath = createSelector(
  selectedPath,
  getIsGameObjectSelected,
  (path, valid) => {
    if (!valid) {
      return null;
    }

    return path.slice(0, GAME_OBJECT_PATH.length);
  }
);

export const getSelectedGameObject = createSelector(
  oniSave,
  getSelectedGameObjectPath,
  (oniSave, path) => {
    if (!oniSave || !path) {
      return null;
    }

    return get(oniSave, path) as GameObject;
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
