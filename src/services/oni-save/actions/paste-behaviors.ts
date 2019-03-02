import { AnyAction } from "redux";

export const ACTION_ONISAVE_PASTE_BEHAVIORS = "oni-save/paste-behaviors";
export const pasteBehaviors = (gameObjectId: number, behaviors?: string[]) => ({
  type: ACTION_ONISAVE_PASTE_BEHAVIORS as typeof ACTION_ONISAVE_PASTE_BEHAVIORS,
  payload: { gameObjectId, behaviors }
});
export type PasteBehaviorAction = ReturnType<typeof pasteBehaviors>;

export function isPasteBehaviorsAction(
  action: AnyAction
): action is PasteBehaviorAction {
  return action.type === ACTION_ONISAVE_PASTE_BEHAVIORS;
}
