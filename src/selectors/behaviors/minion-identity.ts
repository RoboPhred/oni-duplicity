import { MinionIdentityBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import { getCurrentGameObjectBehaviorSelector } from "@/selectors/behaviors/utils";

export const getSelectedGameObjectIdentityBehavior = getCurrentGameObjectBehaviorSelector(
  MinionIdentityBehavior
);

export const getSelectedGameObjectGender = (state: AppState) => {
  const behavior = getSelectedGameObjectIdentityBehavior(state);
  if (!behavior) {
    return null;
  }
  return behavior.templateData.genderStringKey;
};
