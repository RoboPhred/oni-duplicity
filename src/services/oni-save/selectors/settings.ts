
import { saveGameSelector } from "./save-game";
import { createSelector } from "reselect";

export const gameSettingsSelector = createSelector(
  saveGameSelector,
  saveGame => {
    if (!saveGame) {
      return null;
    }
    return saveGame.gameData.customGameSettings;
  }
);