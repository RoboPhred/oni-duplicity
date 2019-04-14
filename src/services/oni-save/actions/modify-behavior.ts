import { AnyAction } from "redux";

export enum BehaviorDataTarget {
  Template = "templateData",
  Extra = "extraData"
}

export const ACTION_ONISAVE_MODIFY_BEHAVIOR = "oni-save/modify-behavior";
export const modifyBehavior = (
  gameObjectId: number,
  behaviorId: string,
  target: BehaviorDataTarget,
  value: any,
  merge: boolean = false
) => ({
  type: ACTION_ONISAVE_MODIFY_BEHAVIOR as typeof ACTION_ONISAVE_MODIFY_BEHAVIOR,
  payload: { gameObjectId, behaviorId, target, value, merge }
});
export type ModifyBehaviorAction = ReturnType<typeof modifyBehavior>;

export function isModifyBehaviorAction(
  action: AnyAction
): action is ModifyBehaviorAction {
  return action.type === ACTION_ONISAVE_MODIFY_BEHAVIOR;
}
