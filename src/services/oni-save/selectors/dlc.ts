import { AppState } from "@/state";

export const dlcIdSelector = (state: AppState) =>
  state.services.oniSave.saveGame?.header.gameInfo.dlcId;
