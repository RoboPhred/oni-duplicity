import { AppState, defaultAppState } from "@/state";

import { LoadingStatus } from "@/services/oni-save/state";

const saveGame = require("./save-game.json");

const state: AppState = {
  ...defaultAppState,
  services: {
    ...defaultAppState.services,
    oniSave: {
      ...defaultAppState.services.oniSave,
      loadingStatus: LoadingStatus.Ready,
      saveGame
    }
  }
};
export default state;
