import { set } from "lodash-es";

import { AppState, defaultAppState } from "@/state";

import {
  ACTION_CURRENTOBJECT_BEHAVIOR_SET_VALUE,
  SetCurrentObjectBehaviorValueAction
} from "@/actions/behaviors/set-currentobject-behavior-value";

import { produceFromBehavior } from "./utils";

export default function setCurrentObjectBehaviorValueReducer(
  state: AppState = defaultAppState,
  action: SetCurrentObjectBehaviorValueAction
): AppState {
  if (action.type !== ACTION_CURRENTOBJECT_BEHAVIOR_SET_VALUE) {
    return state;
  }

  const { behaviorName, path, value } = action.payload;

  return produceFromBehavior(state, behaviorName, behavior => {
    set(behavior, path, value);
  });
}
