import { Vector3 } from "oni-save-parser";

export const ACTION_GAME_OBJECT_SET_SCALE = "game-object/set-scale";
export const setGameObjectScale = (scale: Vector3) => ({
  type: ACTION_GAME_OBJECT_SET_SCALE as typeof ACTION_GAME_OBJECT_SET_SCALE,
  payload: scale
});
export type SetGameObjectScaleAction = ReturnType<typeof setGameObjectScale>;
