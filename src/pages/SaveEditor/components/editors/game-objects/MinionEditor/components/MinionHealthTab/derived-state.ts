import { createStructuredSelector, createSelector } from "reselect";

import {
  GameObject,
  HealthBehavior,
  PrimaryElementBehavior
} from "oni-save-parser";

import { AppState } from "@/state";

import selectedPath from "@/selectors/selected-path";
import selectedValue from "@/selectors/selected-value";

const healthDataPath = createSelector(
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
      "templateData"
    ];
  }
);

const primaryElementDataPath = createSelector(
  selectedValue,
  selectedPath,
  (gameObject: GameObject, selectedPath) => {
    if (!gameObject) {
      return;
    }

    const healthBehaviorIndex = gameObject.behaviors.findIndex(
      x => x.name === PrimaryElementBehavior
    );
    if (healthBehaviorIndex === -1) {
      return null;
    }
    return [
      ...selectedPath,
      "behaviors",
      `${healthBehaviorIndex}`,
      "templateData"
    ];
  }
);

const structuredSelector = {
  selectedPath,
  healthDataPath,
  primaryElementDataPath
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
