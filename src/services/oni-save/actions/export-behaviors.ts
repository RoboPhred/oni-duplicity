export const ACTION_ONISAVE_EXPORT_BEHAVIORS = "oni-save/export-behaviors";
export const exportBehaviors = (gameObjectId: number, behaviors: string[]) => ({
  type: ACTION_ONISAVE_EXPORT_BEHAVIORS as typeof ACTION_ONISAVE_EXPORT_BEHAVIORS,
  payload: { gameObjectId, behaviors }
});
export type ExportBehaviorsAction = ReturnType<typeof exportBehaviors>;
