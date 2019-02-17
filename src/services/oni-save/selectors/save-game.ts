import { AppState } from "@/state";

export const saveGameSelector = (state: AppState) =>
  state.services.oniSave.saveGame;
