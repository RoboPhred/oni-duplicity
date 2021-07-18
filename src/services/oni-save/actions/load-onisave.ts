import { AnyAction } from "redux";

export const ACTION_ONISAVE_LOAD = "oni-save/load";
export const loadOniSave = (file: File, bypassVersionCheck = false) => ({
  type: ACTION_ONISAVE_LOAD as typeof ACTION_ONISAVE_LOAD,
  payload: { file, bypassVersionCheck },
});
export type LoadOniSaveAction = ReturnType<typeof loadOniSave>;
export function isLoadOniSaveAction(
  action: AnyAction
): action is LoadOniSaveAction {
  return action.type === ACTION_ONISAVE_LOAD;
}
