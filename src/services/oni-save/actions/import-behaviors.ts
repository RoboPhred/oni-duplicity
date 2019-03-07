export const ACTION_ONISAVE_IMPORT_BEHAVIORS = "oni-save/import-behaviors";
export const importBehaviors = (gameObjectId: number, file: File) => ({
  type: ACTION_ONISAVE_IMPORT_BEHAVIORS as typeof ACTION_ONISAVE_IMPORT_BEHAVIORS,
  payload: { gameObjectId, file }
});
export type ImportBehaviorsAction = ReturnType<typeof importBehaviors>;
