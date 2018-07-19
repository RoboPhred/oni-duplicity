import { createSelector, Selector } from "reselect";

import { memoize } from "lodash-es";

import { MinionModifiersBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import { getCurrentGameObjectBehaviorSelector } from "@/selectors/behaviors/utils";

export const getSelectedGameObjectModifiersBehavior = getCurrentGameObjectBehaviorSelector(
  MinionModifiersBehavior
);

function createSelectedGameObjectModifierValueSelector(
  amountId: string
): Selector<AppState, number | null> {
  return createSelector(getSelectedGameObjectModifiersBehavior, behavior => {
    if (!behavior) {
      return null;
    }

    const extraData = behavior.extraData;
    if (!extraData) {
      return null;
    }

    const amount = extraData.amounts.find(x => x.name === amountId);
    if (!amount) {
      return null;
    }
    return amount.value.value;
  });
}

export const getSelectedGameObjectModifierValueSelector = memoize(
  createSelectedGameObjectModifierValueSelector
);
