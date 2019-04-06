import { AnyAction } from "redux";

export const ACTION_ONISAVE_MODIFY_RAW = "oni-save/modify-raw";
export const modifyRaw = (path: string[], data: any) => ({
  type: ACTION_ONISAVE_MODIFY_RAW as typeof ACTION_ONISAVE_MODIFY_RAW,
  payload: { path, data }
});
export type ModifyRawAction = ReturnType<typeof modifyRaw>;
export function isModifyRawAction(
  action: AnyAction
): action is ModifyRawAction {
  return action.type === ACTION_ONISAVE_MODIFY_RAW;
}
