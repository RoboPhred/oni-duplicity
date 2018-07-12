import { createSelector } from "reselect";

import { PrimaryElementBehavior, getBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import getSelectedGameObject from "../game-object";

export const getSelectedGameObjectElementBehavior = createSelector(
  getSelectedGameObject,
  gameObject => {
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
