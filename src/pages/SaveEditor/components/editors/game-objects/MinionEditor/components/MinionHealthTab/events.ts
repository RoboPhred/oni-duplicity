import { setHealthStatus } from "@/actions/behaviors/set-health-state";
import { setPrimaryElementDisease } from "@/actions/behaviors/set-element-disease";

const mapDispatchToProps = {
  onHealthStatusChanged: setHealthStatus,
  onSurfaceDiseaseChanged: setPrimaryElementDisease
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
