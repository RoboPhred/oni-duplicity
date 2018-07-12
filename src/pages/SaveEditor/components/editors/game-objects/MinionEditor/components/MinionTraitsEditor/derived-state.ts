import { createStructuredSelector, createSelector } from "reselect";

import { GameObject, AITraitsBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import selectedPath from "@/selectors/selected-path";
import selectedValue from "@/selectors/selected-value";

const traitsDataPath = createSelector(
  selectedValue,
  selectedPath,
  (gameObject: GameObject, selectedPath) => {
    if (!gameObject) {
      return;
    }

    const healthBehaviorIndex = gameObject.behaviors.findIndex(
      x => x.name === AITraitsBehavior
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
  traitsDataPath
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
