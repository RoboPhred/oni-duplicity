import { PrimaryElementBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import { getCurrentGameObjectBehaviorSelector } from "@/selectors/behaviors/utils";

export const getSelectedGameObjectElementBehavior = getCurrentGameObjectBehaviorSelector(
  PrimaryElementBehavior
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
