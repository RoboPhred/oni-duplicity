import { createSelector } from "reselect";
import {
  GameObject,
  PrimaryElementBehavior,
  getBehavior
} from "oni-save-parser";

import getSelectedGameObject from "../game-object";
import { AppState } from "@/state";

export const getSelectedGameObjectElementBehavior = createSelector(
  getSelectedGameObject,
  (gameObject: GameObject) => {
    if (!gameObject) {
      return null;
    }

    return getBehavior(gameObject, PrimaryElementBehavior);
  }
);

export const getSelectedGameObjectElementDiseaseId = (state: AppState) => {
  const behavior = getSelectedGameObjectElementBehavior(state);
  if (!behavior) {
    return null;
  }
  return behavior.templateData.diseaseID;
};

export const getSelectedGameObjectElementDiseaseCount = (state: AppState) => {
  const behavior = getSelectedGameObjectElementBehavior(state);
  if (!behavior) {
    return null;
  }
  return behavior.templateData.diseaseCount;
};
