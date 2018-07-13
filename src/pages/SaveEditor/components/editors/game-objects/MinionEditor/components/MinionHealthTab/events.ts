import { setHealthStatus } from "@/actions/behaviors/set-health-state";
import { setModifierAmount } from "@/actions/behaviors/set-modifier-amount";
import { setPrimaryElementDisease } from "@/actions/behaviors/set-element-disease";

const mapDispatchToProps = {
  onHealthStatusChanged: setHealthStatus,
  onHitpointsChanged(hitpoints: number) {
    return setModifierAmount("HitPoints", hitpoints);
  },
  onSurfaceDiseaseChanged: setPrimaryElementDisease
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
