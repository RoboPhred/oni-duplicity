import { createStructuredSelector, createSelector } from "reselect";

import { GeyserBehavior, GeyserType, GeyserTypeNames } from "oni-save-parser";

import { AppState } from "@/state";

import {
  getCurrentGameObjectBehaviorSelector,
  createCurrentGameObjectBehaviorPropertySelector
} from "@/selectors/behaviors/utils";

const geyserBehaviorSelector = getCurrentGameObjectBehaviorSelector(
  GeyserBehavior
);

const structuredSelector = {
  geyserType: createSelector(geyserBehaviorSelector, behavior => {
    if (!behavior) {
      return null;
    }

    const type =
      (behavior.templateData.configuration &&
        behavior.templateData.configuration.typeId) ||
      null;
    if (!type) {
      return null;
    }

    return GeyserType[type.hash] || null;
  }),
  emissionRate: createCurrentGameObjectBehaviorPropertySelector<
    GeyserBehavior,
    number
  >(GeyserBehavior, ["templateData", "configuration", "rateRoll"]),
  yearLengthRoll: createCurrentGameObjectBehaviorPropertySelector<
    GeyserBehavior,
    number
  >(GeyserBehavior, ["templateData", "configuration", "yearLengthRoll"]),
  yearPercentRoll: createCurrentGameObjectBehaviorPropertySelector<
    GeyserBehavior,
    number
  >(GeyserBehavior, ["templateData", "configuration", "yearPercentRoll"]),
  iterationLengthRoll: createCurrentGameObjectBehaviorPropertySelector<
    GeyserBehavior,
    number
  >(GeyserBehavior, ["templateData", "configuration", "iterationLengthRoll"]),
  iterationPercentRoll: createCurrentGameObjectBehaviorPropertySelector<
    GeyserBehavior,
    number
  >(GeyserBehavior, ["templateData", "configuration", "iterationPercentRoll"])
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
