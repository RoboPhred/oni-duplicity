import { AnyAction } from "redux";

export const ACTION_ONISAVE_IMPORT_BEHAVIORS = "oni-save/import-behaviors";
export const importBehaviors = (gameObjectId: number, file: File) => ({
  type: ACTION_ONISAVE_IMPORT_BEHAVIORS as typeof ACTION_ONISAVE_IMPORT_BEHAVIORS,
  payload: { gameObjectId, file }
});
export type ImportBehaviorsAction = ReturnType<typeof importBehaviors>;

export const ACTION_ONISAVE_IMPORT_WARN_CHECKSUM =
  "oni-save/import/warn-checksum";
export const importWarnChecksum = () => ({
  type: ACTION_ONISAVE_IMPORT_WARN_CHECKSUM as typeof ACTION_ONISAVE_IMPORT_WARN_CHECKSUM
});
export type ImportWarnChecksumAction = ReturnType<typeof importWarnChecksum>;
export function isImportWarnChecksumAction(
  action: AnyAction
): action is ImportWarnChecksumAction {
  return action.type === ACTION_ONISAVE_IMPORT_WARN_CHECKSUM;
}

export const ACTION_ONISAVE_IMPORT_CONFIRM = "oni-save/import/confirm";
export const importConfirm = (doImport: boolean) => ({
  type: ACTION_ONISAVE_IMPORT_CONFIRM as typeof ACTION_ONISAVE_IMPORT_CONFIRM,
  payload: doImport
});
export type ImportConfirmAction = ReturnType<typeof importConfirm>;
export function isImportConfirmAction(
  action: AnyAction
): action is ImportWarnChecksumAction {
  return action.type === ACTION_ONISAVE_IMPORT_CONFIRM;
}
