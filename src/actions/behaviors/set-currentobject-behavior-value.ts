import { GameObjectBehavior, BehaviorName } from "oni-save-parser";

export const ACTION_CURRENTOBJECT_BEHAVIOR_SET_VALUE =
  "oni-save/current-object/behaviors/set-value";
export function setCurrentObjectBehaviorValue<T extends GameObjectBehavior>(
  behaviorName: BehaviorName<T>,
  path: string[],
  value: any
) {
  return {
    type: ACTION_CURRENTOBJECT_BEHAVIOR_SET_VALUE as typeof ACTION_CURRENTOBJECT_BEHAVIOR_SET_VALUE,
    payload: { behaviorName, path, value }
  };
}
export type SetCurrentObjectBehaviorValue<
  T extends GameObjectBehavior = GameObjectBehavior
> = {
  type: typeof ACTION_CURRENTOBJECT_BEHAVIOR_SET_VALUE;
  payload: {
    behaviorName: BehaviorName<T>;
    path: string[];
    value: any;
  };
};
