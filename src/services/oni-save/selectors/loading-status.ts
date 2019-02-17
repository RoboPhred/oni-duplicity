import { AppState } from "@/state";

export const loadingStatusSelector = (state: AppState) =>
  state.services.oniSave.loadingStatus;
