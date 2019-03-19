import { AnyAction } from "redux";

import { SpacecraftDestination } from "@/types/oni-save-parser";

export const ACTION_ONISAVE_MODIFY_PLANET = "oni-save/modify-planet";
export const modifyPlanet = (
  planetId: number,
  planet: Partial<SpacecraftDestination>
) => ({
  type: ACTION_ONISAVE_MODIFY_PLANET as typeof ACTION_ONISAVE_MODIFY_PLANET,
  payload: { planetId, planet }
});
export type ModifyPlanetAction = ReturnType<typeof modifyPlanet>;
export function isModifyPlanetAction(
  action: AnyAction
): action is ModifyPlanetAction {
  return action.type === ACTION_ONISAVE_MODIFY_PLANET;
}
