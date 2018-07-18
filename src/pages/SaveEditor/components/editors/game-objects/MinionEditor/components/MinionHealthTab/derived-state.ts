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

import { getSelectedGameObjectModifierValueSelector } from "@/selectors/behaviors/minion-modifiers";

const structuredSelector = {
  healthState: getSelectedGameObjectHealthState,
  surfaceDiseaseId: getSelectedGameObjectElementDiseaseId,
  surfaceDiseaseCount: getSelectedGameObjectElementDiseaseCount,
  hitpoints: getSelectedGameObjectModifierValueSelector("HitPoints"),
  stamina: getSelectedGameObjectModifierValueSelector("Stamina"),
  calories: getSelectedGameObjectModifierValueSelector("Calories"),
  immuneLevel: getSelectedGameObjectModifierValueSelector("ImmuneLevel"),
  breath: getSelectedGameObjectModifierValueSelector("Breath"),
  stress: getSelectedGameObjectModifierValueSelector("Stress"),
  bladder: getSelectedGameObjectModifierValueSelector("Bladder"),
  foodPoisoning: getSelectedGameObjectModifierValueSelector("FoodPoisoning"),
  coldBrain: getSelectedGameObjectModifierValueSelector("ColdBrain"),
  heatRash: getSelectedGameObjectModifierValueSelector("HeatRash"),
  slimeLung: getSelectedGameObjectModifierValueSelector("SlimeLung"),
  sunburn: getSelectedGameObjectModifierValueSelector("Sunburn"),
  spores: getSelectedGameObjectModifierValueSelector("Spores")
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
