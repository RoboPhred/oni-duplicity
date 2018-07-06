import { EditMode } from "@/services/save-structure";

export const ACTION_SET_EDITMODE = "@/pages/SaveEditor/set-editmode";
export const setEditMode = (editMode: EditMode) => ({
  type: ACTION_SET_EDITMODE as typeof ACTION_SET_EDITMODE,
  payload: editMode
});
export type SetEditModeAction = ReturnType<typeof setEditMode>;
