
import { createSelector } from "reselect";

import { saveEditor } from "../selectors";

export const isSaveChosen = createSelector(saveEditor, saveEditor => Boolean(saveEditor.fileName != null));
export const saveFileName = createSelector(saveEditor, saveEditor => saveEditor.fileName);
export const isSaveLoaded = createSelector(saveEditor, saveEditor => Boolean(saveEditor.fileName != null && !saveEditor.isLoading));
export const isSaveLoading = createSelector(saveEditor, saveEditor => saveEditor.isLoading);
export const isSaveSaving = createSelector(saveEditor, saveEditor => saveEditor.isSaving);
export const isSaveEnabled = createSelector(saveEditor, saveEditor => Boolean(saveEditor.fileName && saveEditor.isLoading == false));
export const loadError = createSelector(saveEditor, saveEditor => saveEditor.loadError);
