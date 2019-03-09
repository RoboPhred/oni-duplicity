import { AnyAction } from "redux";

export const ACTION_ONISAVE_CHANGE_GAMEOBJECT_TYPE =
  "oni-save/change-gameobject-type";

/**
 * Changes the game object type of the given game object id.
 *
 * This is a dangerous operation, and intended only for swapping geysers.
 */
export const changeGameObjectType = (
  gameObjectId: number,
  gameObjectType: string
) => ({
  type: ACTION_ONISAVE_CHANGE_GAMEOBJECT_TYPE as typeof ACTION_ONISAVE_CHANGE_GAMEOBJECT_TYPE,
  payload: { gameObjectId, gameObjectType }
});
export type ChangeGameObjectTypeAction = ReturnType<
  typeof changeGameObjectType
>;
export function isChangeGameObjectTypeAction(
  action: AnyAction
): action is ChangeGameObjectTypeAction {
  return action.type === ACTION_ONISAVE_CHANGE_GAMEOBJECT_TYPE;
}
