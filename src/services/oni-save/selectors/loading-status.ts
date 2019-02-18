import { AppState } from "@/state";
import { LoadingStatus } from "../state";

export const loadingStatusSelector = (state: AppState) =>
  state.services.oniSave.loadingStatus;

export const loadingStatusLoadingSelector = (state: AppState) =>
  loadingStatusSelector(state) === LoadingStatus.Loading;

export const loadingStatusReadySelector = (state: AppState) =>
  loadingStatusSelector(state) === LoadingStatus.Ready;
