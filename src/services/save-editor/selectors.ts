
import { createSelector } from "reselect";

import { AppState } from "../../state";

export const isSaveChosen = (state: AppState) => Boolean(state.saveEditor.fileName != null);
export const saveFileName = (state: AppState) => state.saveEditor.fileName;
export const isSaveLoaded = (state: AppState) => Boolean(state.saveEditor.fileName != null && !state.saveEditor.isLoading);
export const isSaveLoading = (state: AppState) => state.saveEditor.isLoading;
export const isSaveEnabled = (state: AppState) => Boolean(state.saveEditor.fileName && state.saveEditor.isLoading == false);
export const loadError = (state: AppState) => state.saveEditor.loadError;
export const saveGame = (state: AppState) => state.saveEditor.saveGame;