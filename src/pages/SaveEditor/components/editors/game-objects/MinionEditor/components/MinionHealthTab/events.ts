import { setHealthStatus } from "@/actions/behaviors/set-health-state";
import { setModifierValue } from "@/actions/behaviors/set-modifier-amount";
import { setPrimaryElementDisease } from "@/actions/behaviors/set-element-disease";

const mapDispatchToProps = {
  onHealthStatusChanged: setHealthStatus,
  onHitpointsChanged(hitpoints: number) {
    return setModifierValue("HitPoints", hitpoints);
  },
  onStaminaChanged(stamina: number) {
    return setModifierValue("Stamina", stamina);
  },
  onCaloriesChanged(calories: number) {
    return setModifierValue("Calories", calories);
  },
  onImmuneLevelChanged(level: number) {
    return setModifierValue("ImmuneLevel", level);
  },
  onBreathChanged(level: number) {
    return setModifierValue("Breath", level);
  },
  onStressChanged(level: number) {
    return setModifierValue("Stress", level);
  },
  onBladderChanged(level: number) {
    return setModifierValue("Bladder", level);
  },
  onFoodPoisoningChanged(level: number) {
    return setModifierValue("FoodPoisoning", level);
  },
  onColdBrainChanged(level: number) {
    return setModifierValue("ColdBrain", level);
  },
  onHeatRashChanged(level: number) {
    return setModifierValue("HeatRash", level);
  },
  onSlimeLungChanged(level: number) {
    return setModifierValue("SlimeLung", level);
  },
  onSunburnChanged(level: number) {
    return setModifierValue("Sunburn", level);
  },
  onSporesChanged(level: number) {
    return setModifierValue("Spores", level);
  },

  onSurfaceDiseaseChanged: setPrimaryElementDisease
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
