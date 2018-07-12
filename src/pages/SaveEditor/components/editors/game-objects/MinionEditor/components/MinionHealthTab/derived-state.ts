import { createStructuredSelector, createSelector } from "reselect";

import {
  GameObject,
  HealthBehavior,
  PrimaryElementBehavior
} from "oni-save-parser";

import { AppState } from "@/state";

import { getSelectedGameObjectHealthState } from "@/selectors/behaviors/health";

import {
  getSelectedGameObjectElementDiseaseId,
  getSelectedGameObjectElementDiseaseCount
} from "@/selectors/behaviors/primary-element";

const structuredSelector = {
  healthState: getSelectedGameObjectHealthState,
  surfaceDiseaseId: getSelectedGameObjectElementDiseaseId,
  surfaceDiseaseCount: getSelectedGameObjectElementDiseaseCount
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
