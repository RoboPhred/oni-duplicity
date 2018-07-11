export const ACTION_ONISAVE_MODIFY = "oni-save/modify";
export const modifyOniSave = (path: string[], value: any) => ({
  type: ACTION_ONISAVE_MODIFY as typeof ACTION_ONISAVE_MODIFY,
  payload: { path, value }
});
export type ModifyOniSaveAction = ReturnType<typeof modifyOniSave>;
