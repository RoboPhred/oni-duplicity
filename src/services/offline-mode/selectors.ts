import { AppState } from "@/state";

const offlineModeState = (state: AppState) => state.services.offlineMode;

export const isOfflineModeSupported = (state: AppState) =>
  offlineModeState(state).supported;
export const isOfflineModeEnabled = (state: AppState) =>
  offlineModeState(state).enabled;
