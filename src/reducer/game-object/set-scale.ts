import { AppState, defaultAppState } from "@/state";

import {
  ACTION_GAME_OBJECT_SET_SCALE,
  SetGameObjectScaleAction
} from "@/actions/game-object/set-scale";

import { produceFromGameObject } from "./utils";

export default function setGameObjectScaleReducer(
  state: AppState = defaultAppState,
  action: SetGameObjectScaleAction
): AppState {
  if (action.type !== ACTION_GAME_OBJECT_SET_SCALE) {
    return state;
  }

  return produceFromGameObject(state, gameObject => {
    const { x, y, z } = action.payload;
    gameObject.scale.x = x;
    gameObject.scale.y = y;
    gameObject.scale.z = z;
  });
}
