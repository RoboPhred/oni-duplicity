import { HealthState } from "oni-save-parser";

export const ACTION_HEALTH_SET_STATE = "behaviors/health/set-state";
export const setHealthStatus = (state: HealthState) => ({
  type: ACTION_HEALTH_SET_STATE as typeof ACTION_HEALTH_SET_STATE,
  payload: state
});
export type SetHealthStateAction = ReturnType<typeof setHealthStatus>;
