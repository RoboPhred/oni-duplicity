import { createSelector } from "reselect";

import { MinionIdentityBehavior, getBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import getSelectedGameObject from "@/selectors/game-object";

export const getSelectedGameObjectIdentityBehavior = createSelector(
  getSelectedGameObject,
  gameObject => {
    if (!gameObject) {
      return null;
    }

    return getBehavior(gameObject, MinionIdentityBehavior);
  }
);

export const getSelectedGameObjectIdentityGender = (state: AppState) => {
  const behavior = getSelectedGameObjectIdentityBehavior(state);
  if (!behavior) {
    return null;
  }
  return behavior.templateData.genderStringKey;
};
