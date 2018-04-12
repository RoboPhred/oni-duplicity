
import { createAction } from "../../../action-utils";

export const ACTION_DUPLICANT_RENAME = "@save-editor/duplicants/rename";
export const renameDuplicant = createAction(ACTION_DUPLICANT_RENAME, (x: {prefabID: number, name: string}) => x);
export type RenameDuplicantAction = ReturnType<typeof renameDuplicant>;

export type DuplicantActions = RenameDuplicantAction;
