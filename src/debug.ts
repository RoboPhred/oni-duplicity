import { isProd } from "@/runtime-env";

import store from "@/store/store";

import {
  receiveOniSaveSuccess,
  receiveOniSaveError
} from "@/services/oni-save/actions/receive-onisave";
import { LoadingStatus } from "@/services/oni-save/state";

if (!isProd) {
  window.loadMockSave = () => {
    const mockSaveGame = require("@/__mocks__/save-game.json");
    store.dispatch(receiveOniSaveSuccess(mockSaveGame, LoadingStatus.Loading));
  };
  window.loadMockError = () => {
    store.dispatch(
      receiveOniSaveError(
        new Error("This is a test error"),
        LoadingStatus.Loading
      )
    );
  };
}
