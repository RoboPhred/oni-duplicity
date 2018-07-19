import { Action } from "redux";
import { GameObjectBehavior, BehaviorName } from "oni-save-parser";

export const ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_INSERT_ITEM =
  "oni-save/current-object/behaviors/modify-array/insert-item";
export function insertCurrentObjectBehaviorArrayValue<
  T extends GameObjectBehavior
>(behaviorName: BehaviorName<T>, path: string[], value: any, index?: number) {
  return {
    type: ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_INSERT_ITEM as typeof ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_INSERT_ITEM,
    payload: { behaviorName, path, value, index }
  };
}
export type InsertCurrentObjectBehaviorArrayValueAction = ReturnType<
  typeof insertCurrentObjectBehaviorArrayValue
>;

export const ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_REMOVE_ITEM =
  "oni-save/current-object/behaviors/modify-array/remove-item";
export function removeCurrentObjectBehaviorArrayValue<
  T extends GameObjectBehavior
>(behaviorName: BehaviorName<T>, path: string[], value: any) {
  return {
    type: ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_REMOVE_ITEM as typeof ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_REMOVE_ITEM,
    payload: { behaviorName, path, value }
  };
}
export type RemoveCurrentObjectBehaviorArrayValueAction<
  T extends GameObjectBehavior = GameObjectBehavior
> = ReturnType<typeof removeCurrentObjectBehaviorArrayValue>;

export const ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_REMOVE_INDEX =
  "oni-save/current-object/behaviors/modify-array/remove-index";
export function removeCurrentObjectBehaviorArrayIndex<
  T extends GameObjectBehavior
>(behaviorName: BehaviorName<T>, path: string[], index: number) {
  return {
    type: ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_REMOVE_INDEX as typeof ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_REMOVE_INDEX,
    payload: { behaviorName, path, index }
  };
}
export type RemoveCurrentObjectBehaviorArrayValueIndex<
  T extends GameObjectBehavior = GameObjectBehavior
> = ReturnType<typeof removeCurrentObjectBehaviorArrayIndex>;

export type CurrentObjectBehaviorArrayAction =
  | InsertCurrentObjectBehaviorArrayValueAction
  | RemoveCurrentObjectBehaviorArrayValueAction
  | RemoveCurrentObjectBehaviorArrayValueIndex;

export function isCurrentObjectBehaviorArrayAction(
  action: Action
): action is CurrentObjectBehaviorArrayAction {
  switch (action.type) {
    case ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_INSERT_ITEM:
    case ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_REMOVE_ITEM:
    case ACTION_CURRENTOBJECT_BEHAVIOR_ARRAY_REMOVE_INDEX:
      return true;
    default:
      return false;
  }
}
