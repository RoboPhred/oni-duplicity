import * as React from "react";
import { QualityLevelSettingValues } from "oni-save-parser";
import { useSelector, useDispatch } from "react-redux";
import { find } from "lodash";

import { keysOfType } from "@/utils";

import { gameSettingsSelector } from "../selectors/settings";
import { modifyDifficulty } from "../actions/modify-difficulty";

export interface UseDifficulty {
  difficulty: Record<
    keyof typeof QualityLevelSettingValues,
    string
  >;
  onModifyDifficulty(type: keyof typeof QualityLevelSettingValues, value: string): void;
}

export default function useDifficulty(): UseDifficulty {
  const dispatch = useDispatch();
  const gameSettings = useSelector(gameSettingsSelector);

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

  const onModifyDifficulty = React.useCallback((type: keyof typeof QualityLevelSettingValues, value: string) => {
    dispatch(modifyDifficulty(type, value));
  }, [dispatch]);

  return {
    difficulty,
    onModifyDifficulty
  };
}