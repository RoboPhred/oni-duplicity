import { AnyAction } from "redux";

export const ACTION_ONISAVE_LOAD_EXAMPLE = "oni-save/load-example";
export const loadExampleSave = () => ({
  type: ACTION_ONISAVE_LOAD_EXAMPLE
});
export type LoadExampleSaveAction = ReturnType<typeof loadExampleSave>;
export function isLoadExampleSaveAction(
  action: AnyAction
): action is LoadExampleSaveAction {
  return action.type === ACTION_ONISAVE_LOAD_EXAMPLE;
}
