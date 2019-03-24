import { createSelector } from "reselect";
import { find } from "lodash-es";

import {
  DifficultySetting,
  DifficultySetttingNames
} from "@/types/oni-save-parser";

import { saveGameSelector } from "../selectors/save-game";
import { createStructuredSelector } from "./utils";
import { connectRenderComponent } from "./connectRenderComponent";

const gameSettingsSelector = createSelector(
  saveGameSelector,
  saveGame => {
    if (!saveGame) {
      return null;
    }
    return saveGame.gameData.customGameSettings;
  }
);

export type DifficultySettings = Record<DifficultySetting, string>;
const difficultySelector = createSelector(
  gameSettingsSelector,
  gameSettings => {
    const difficulty: Record<string, string> = {};
    if (gameSettings) {
      for (const setting of DifficultySetttingNames) {
        const [_, value] = find(
          gameSettings.CurrentQualityLevelsBySetting,
          x => x[0] === setting
        ) || [null, null];
        if (value) {
          difficulty[setting] = value;
        }
      }
    }

    return difficulty;
  }
);

const mapStateToProps = createStructuredSelector({
  difficulty: difficultySelector
});

export default connectRenderComponent(mapStateToProps);
