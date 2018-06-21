export const ACTION_ONISAVE_SAVE = "@/pages/SaveEditor/onisave/save";
export const saveOniSave = (fileName: string) => ({
  type: ACTION_ONISAVE_SAVE as typeof ACTION_ONISAVE_SAVE,
  payload: fileName
});
export type SaveOniSaveAction = ReturnType<typeof saveOniSave>;
