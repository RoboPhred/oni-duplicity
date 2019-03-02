import { AnyAction } from "redux";

export const ACTION_ONISAVE_CLONE_DUPLICANT = "oni-save/clone-duplicant";
export const cloneDuplicant = (gameObjectId: number) => ({
  type: ACTION_ONISAVE_CLONE_DUPLICANT as typeof ACTION_ONISAVE_CLONE_DUPLICANT,
  payload: { gameObjectId }
});
export type CloneDuplicantAction = ReturnType<typeof cloneDuplicant>;

export function isCloneDuplicantAction(
  action: AnyAction
): action is CloneDuplicantAction {
  return action.type === ACTION_ONISAVE_CLONE_DUPLICANT;
}
