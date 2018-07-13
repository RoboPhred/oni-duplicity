import { createSelector } from "reselect";

import { MinionModifiersBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import { getCurrentGameObjectBehaviorSelector } from "@/selectors/behaviors/utils";

export const getSelectedGameObjectModifiersBehavior = getCurrentGameObjectBehaviorSelector(
  MinionModifiersBehavior
);

export const getSelectedGameObjectHitPoints = createSelector(
  getSelectedGameObjectModifiersBehavior,
  behavior => {
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
  }
);

(state: AppState) => {
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
