import produce from "immer";

import { AppState, defaultAppState } from "@/state";

import { LoadingStatus } from "@/services/oni-save/state";

const saveGame = require("./save-game.json");

const state: AppState = produce(defaultAppState, state => {
  const oniSaveState = state.services.oniSave;
  oniSaveState.loadingStatus = LoadingStatus.Ready;
  oniSaveState.saveGame = saveGame;
});
export default state;
