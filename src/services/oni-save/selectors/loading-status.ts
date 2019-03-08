import { AppState } from "@/state";

export const loadingStatusSelector = (state: AppState) =>
  state.services.oniSave.loadingStatus;

export const loadingStatusMessageSelector = (state: AppState) =>
  state.services.oniSave.loadingProgressMessage;
