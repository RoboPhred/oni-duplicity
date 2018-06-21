export const ACTION_ONISAVE_LOAD = "@/pages/SaveEditor/onisave/load";
export const loadOniSave = (file: File) => ({
  type: ACTION_ONISAVE_LOAD as typeof ACTION_ONISAVE_LOAD,
  payload: file
});
export type LoadOniSaveAction = ReturnType<typeof loadOniSave>;
