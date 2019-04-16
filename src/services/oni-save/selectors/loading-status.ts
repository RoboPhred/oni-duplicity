import { AppState } from "@/state";

export const loadingStatusSelector = (state: AppState) =>
  state.services.oniSave.loadingStatus;

export const loadingStatusMessageSelector = (state: AppState) =>
  state.services.oniSave.loadingProgressMessage;

export const loadingErrorSelector = (state: AppState) =>
  state.services.oniSave.loadError;

export const loadingErrorMessageSelector = (state: AppState) => {
  const error = loadingErrorSelector(state);
  if (error) {
    return error.message;
  }
  return null;
};
