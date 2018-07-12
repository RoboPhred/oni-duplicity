import { createSelector } from "reselect";
import { GameObject, HealthBehavior, getBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import { getSelectedGameObject } from "../game-object";

export const getSelectedGameObjectHealthBehavior = createSelector(
  getSelectedGameObject,
  (gameObject: GameObject) => {
    if (!gameObject) {
      return null;
    }

    return getBehavior(gameObject, HealthBehavior);
  }
);

export const getSelectedGameObjectHealthState = (state: AppState) => {
  const behavior = getSelectedGameObjectHealthBehavior(state);
  if (!behavior) {
    return null;
  }
  return behavior.templateData.State;
};
