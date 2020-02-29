import { AnyAction } from "redux";
import { GeyserBehavior } from "oni-save-parser";

// Should probably export this from oni-save-parser.
export type GeyserConfiguration = NonNullable<
  GeyserBehavior["templateData"]["configuration"]
>;

export const ACTION_ONISAVE_CHANGE_GEYSER_PARAMETER =
  "oni-save/change-geyser-parameter";

/**
 * Changes the game object type of the given game object id.
 *
 * This is a dangerous operation, and intended only for swapping geysers.
 */
export const changeGeyserParameter = <K extends keyof GeyserConfiguration>(
  gameObjectId: number,
  parameter: K,
  value: GeyserConfiguration[K]
) => ({
  type: ACTION_ONISAVE_CHANGE_GEYSER_PARAMETER as typeof ACTION_ONISAVE_CHANGE_GEYSER_PARAMETER,
  payload: { gameObjectId, parameter, value }
});
export type ChangeGeyserParameterAction = ReturnType<
  typeof changeGeyserParameter
>;
export function isChangeGeyserParameterAction(
  action: AnyAction
): action is ChangeGeyserParameterAction {
  return action.type === ACTION_ONISAVE_CHANGE_GEYSER_PARAMETER;
}
