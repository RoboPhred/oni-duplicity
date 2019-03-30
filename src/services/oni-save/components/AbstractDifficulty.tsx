import { createSelector } from "reselect";
import { find } from "lodash-es";
import { QualityLevelSettingValues } from "oni-save-parser";

import { keysOfType } from "@/utils";

import { saveGameSelector } from "../selectors/save-game";
import { createStructuredSelector } from "./utils";
import { connectRenderComponent } from "./connectRenderComponent";
import { modifyDifficulty } from "../actions/modify-difficulty";

const gameSettingsSelector = createSelector(
  saveGameSelector,
  saveGame => {
    if (!saveGame) {
      return null;
    }
    return saveGame.gameData.customGameSettings;
  }
);

const difficultySelector = createSelector(
  gameSettingsSelector,
  gameSettings => {
    const difficulty: Record<
      keyof typeof QualityLevelSettingValues,
      string
    > = {} as any;
    if (gameSettings) {
      for (const setting of keysOfType(QualityLevelSettingValues)) {
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

const mapDispatchToProps = {
  onModifyDifficulty: modifyDifficulty
};

export default connectRenderComponent(mapStateToProps, mapDispatchToProps);
