import { HealthBehavior } from "oni-save-parser";

import { AppState, defaultAppState } from "@/state";

import {
  ACTION_HEALTH_SET_STATE,
  SetHealthStateAction
} from "@/actions/behaviors/set-health-state";

import { produceFromBehavior } from "./utils";

export default function setHealthStateReducer(
  state: AppState = defaultAppState,
  action: SetHealthStateAction
): AppState {
  if (action.type !== ACTION_HEALTH_SET_STATE) {
    return state;
  }

  return produceFromBehavior(state, HealthBehavior, behavior => {
    behavior.templateData.State = action.payload;
  });
}
