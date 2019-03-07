import { AnyAction } from "redux";

export const ACTION_ONISAVE_COPY_BEHAVIORS = "oni-save/copy-behaviors";
export const copyBehaviors = (gameObjectId: number, behaviors: string[]) => ({
  type: ACTION_ONISAVE_COPY_BEHAVIORS as typeof ACTION_ONISAVE_COPY_BEHAVIORS,
  payload: { gameObjectId, behaviors }
});
export type CopyBehaviorsAction = ReturnType<typeof copyBehaviors>;

export function isCopyBehaviorsAction(
  action: AnyAction
): action is CopyBehaviorsAction {
  return action.type === ACTION_ONISAVE_COPY_BEHAVIORS;
}
