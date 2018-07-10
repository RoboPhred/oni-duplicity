import { createStructuredSelector, createSelector } from "reselect";

import {
  GameObject,
  PrimaryElementBehavior,
  getBehavior
} from "oni-save-parser";

import { AppState } from "@/state";

import selectedValue from "@/selectors/selected-value-selector";

const position = createSelector(
  selectedValue,
  (value: GameObject) => value && value.position
);

const primaryElementBehavior = createSelector(selectedValue, value => {
  if (!value) {
    return null;
  }

  return getBehavior(value, PrimaryElementBehavior);
});

const primaryElement = createSelector(primaryElementBehavior, behavior => {
  if (!behavior) {
    return null;
  }

  return behavior.templateData.ElementID;
});

const diseaseId = createSelector(primaryElementBehavior, behavior => {
  if (!behavior) {
    return null;
  }

  return behavior.templateData.diseaseID;
});

const structuredSelector = {
  position,
  primaryElement,
  diseaseId
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
