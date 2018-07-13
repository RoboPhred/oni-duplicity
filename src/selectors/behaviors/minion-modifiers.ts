import { createSelector } from "reselect";

import { MinionModifiersBehavior, getBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import getSelectedGameObject from "@/selectors/game-object";

export const getSelectedGameObjectModifiersBehavior = createSelector(
  getSelectedGameObject,
  gameObject => {
    if (!gameObject) {
      return null;
    }

    return getBehavior(gameObject, MinionModifiersBehavior);
  }
);

export const getSelectedGameObjectHitPoints = (state: AppState) => {
  const behavior = getSelectedGameObjectModifiersBehavior(state);
  if (!behavior) {
    return null;
  }
  const extraData = behavior.extraData;
  if (!extraData) {
    return null;
  }

  const hitpoints = extraData.amounts.find(x => x.name === "HitPoints");
  if (!hitpoints) {
    return null;
  }
  return hitpoints.value.value;
};
