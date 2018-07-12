import { AccessoryType } from "oni-save-parser";

export const ACTION_SET_ACCESSORY = "behaviors/accessorizer/set-accessory";
export const setAccessory = (
  accessoryType: AccessoryType,
  accessoryName: string | null
) => ({
  type: ACTION_SET_ACCESSORY as typeof ACTION_SET_ACCESSORY,
  payload: { accessoryType, accessoryName }
});
export type SetAccessoryAction = ReturnType<typeof setAccessory>;
