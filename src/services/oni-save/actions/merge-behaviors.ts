import { AnyAction } from "redux";

export const ACTION_ONISAVE_MERGE_BEHAVIORS = "oni-save/merge-behaviors";
export const mergeBehaviors = (
  gameObjectId: number,
  behaviors: Record<string, { templateData?: any; extraData?: any }>
) => ({
  type: ACTION_ONISAVE_MERGE_BEHAVIORS as typeof ACTION_ONISAVE_MERGE_BEHAVIORS,
  payload: { gameObjectId, behaviors }
});
export type MergeBehaviorsAction = ReturnType<typeof mergeBehaviors>;

export function isMergeBehaviorsAction(
  action: AnyAction
): action is MergeBehaviorsAction {
  return action.type === ACTION_ONISAVE_MERGE_BEHAVIORS;
}
