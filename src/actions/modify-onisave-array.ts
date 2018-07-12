export const ACTION_ONISAVE_MODIFY_ARRAY = "oni-save/modify-array";
export const modifyOniSaveArray = (
  path: string[],
  mode: "insert" | "set" | "remove",
  value: any,
  index?: number
) => ({
  type: ACTION_ONISAVE_MODIFY_ARRAY as typeof ACTION_ONISAVE_MODIFY_ARRAY,
  payload: { path, mode, value, index }
});
export type ModifyOniSaveArrayAction = ReturnType<typeof modifyOniSaveArray>;
