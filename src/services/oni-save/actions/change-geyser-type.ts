import { AnyAction } from "redux";

export const ACTION_ONISAVE_CHANGE_GEYSER_TYPE = "oni-save/change-geyser-type";

/**
 * Changes the game object type of the given game object id.
 *
 * This is a dangerous operation, and intended only for swapping geysers.
 */
export const changeGeyserType = (gameObjectId: number, geyserType: string) => ({
  type: ACTION_ONISAVE_CHANGE_GEYSER_TYPE as typeof ACTION_ONISAVE_CHANGE_GEYSER_TYPE,
  payload: { gameObjectId, geyserType }
});
export type ChangeGeyserTypeAction = ReturnType<typeof changeGeyserType>;
export function isChangeGeyserTypeAction(
  action: AnyAction
): action is ChangeGeyserTypeAction {
  return action.type === ACTION_ONISAVE_CHANGE_GEYSER_TYPE;
}
