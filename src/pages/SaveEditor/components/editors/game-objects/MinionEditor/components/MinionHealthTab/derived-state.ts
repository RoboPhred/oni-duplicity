import { createStructuredSelector, createSelector } from "reselect";

import { GameObject, HealthBehavior, getBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import selectedPath from "@/selectors/selected-path";
import selectedValue from "@/selectors/selected-value";

const healthBehavior = createSelector(
  selectedValue,
  (gameObject: GameObject) => {
    return getBehavior(gameObject, HealthBehavior);
  }
);

const healthStatePath = createSelector(
  selectedValue,
  selectedPath,
  (gameObject: GameObject, selectedPath) => {
    if (!gameObject) {
      return;
    }

    const healthBehaviorIndex = gameObject.behaviors.findIndex(
      x => x.name === HealthBehavior
    );
    if (healthBehaviorIndex === -1) {
      return null;
    }
    return [
      ...selectedPath,
      "behaviors",
      `${healthBehaviorIndex}`,
      "templateData",
      "State"
    ];
  }
);

const structuredSelector = {
  selectedPath,
  healthStatePath
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
