import { AccessoryType } from "oni-save-parser";

export const ACTION_SET_ACCESSORY =
  "@/pages/SaveEditor/oni-save/behaviors/accessorizer/set-accessory";
export const setAccessory = (
  gameObjectPath: string[],
  type: AccessoryType,
  name: string | null
) => ({
  type: ACTION_SET_ACCESSORY as typeof ACTION_SET_ACCESSORY,
  payload: { gameObjectPath, type, name }
});
export type SetAccessoryAction = ReturnType<typeof setAccessory>;
