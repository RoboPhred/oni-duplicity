import { AITraitsBehavior } from "oni-save-parser";

import { getCurrentGameObjectBehaviorSelector } from "@/selectors/behaviors/utils";
import { createSelector } from "reselect";

export const getSelectedGameObjectIdentityBehavior = getCurrentGameObjectBehaviorSelector(
  AITraitsBehavior
);

export const getSelectedGameObjectTraits = createSelector(
  getSelectedGameObjectIdentityBehavior,
  behavior => {
    if (behavior == null) {
      return null;
    }

    return behavior.templateData.TraitIds;
  }
);
