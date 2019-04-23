import { AnyAction } from "redux";
import { GameObjectBehavior, BehaviorName } from "oni-save-parser";

export const ACTION_MODIFY_BEHAVIOR_PATH = "oni-save/modify-behavior-path";

export function modifyBehaviorPath<
  T extends GameObjectBehavior,
  K extends keyof T,
  K2 extends keyof T[K]
>(
  gameObjectId: number,
  behaviorName: BehaviorName<T>,
  behaviorPath: [K, K2],
  value: T[K][K2]
): ModifyBehaviorPathAction;
export function modifyBehaviorPath<
  T extends GameObjectBehavior,
  K extends keyof T,
  K2 extends keyof T[K],
  K3 extends keyof T[K][K2]
>(
  gameObjectId: number,
  behaviorName: BehaviorName<T>,
  behaviorPath: [K, K2, K3],
  value: T[K][K2][K3]
): ModifyBehaviorPathAction;
export function modifyBehaviorPath(
  gameObjectId: number,
  behaviorName: string,
  behaviorPath: string[],
  value: any
): ModifyBehaviorPathAction {
  return {
    type: ACTION_MODIFY_BEHAVIOR_PATH,
    payload: {
      gameObjectId,
      behaviorName,
      behaviorPath,
      value
    }
  };
}

export interface ModifyBehaviorPathAction {
  type: typeof ACTION_MODIFY_BEHAVIOR_PATH;
  payload: {
    gameObjectId: number;
    behaviorName: string;
    behaviorPath: string[];
    value: any;
  };
}
export function isModifyBehaviorPathAction(
  action: AnyAction
): action is ModifyBehaviorPathAction {
  return action.type === ACTION_MODIFY_BEHAVIOR_PATH;
}
