import { AnyAction } from "redux";

import { OniSaveState, defaultOniSaveState, LoadingStatus } from "../state";
import { isLoadExampleSaveAction } from "../actions/load-example";

export default function loadExampleSaveReducer(
  state: OniSaveState = defaultOniSaveState,
  action: AnyAction
): OniSaveState {
  if (!isLoadExampleSaveAction(action)) {
    return state;
  }

  const mockSaveGame = require("@/__mocks__/save-game.json");

  return {
    ...state,
    saveGame: mockSaveGame,
    loadingStatus: LoadingStatus.Ready,
    isMock: true
  };
}
