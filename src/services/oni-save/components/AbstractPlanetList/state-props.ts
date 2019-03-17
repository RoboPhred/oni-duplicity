import { createSelector, createStructuredSelector } from "reselect";
import { find } from "lodash-es";
import { getBehavior } from "oni-save-parser";

import {
  SpacecraftManagerBehavior,
  SpacecraftDestination
} from "@/types/oni-save-parser";

import { saveGameSelector } from "../../selectors/save-game";
import { AppState } from "@/state";

const planetsSelector = createSelector(
  saveGameSelector,
  saveGame => {
    if (!saveGame) {
      return [];
    }

    const saveGameGroup = find(
      saveGame.gameObjects,
      x => x.name === "SaveGame"
    );
    if (!saveGameGroup) {
      return [];
    }

    const saveGameObject = saveGameGroup.gameObjects[0];
    if (!saveGameObject) {
      return [];
    }

    const spaceBehavior = getBehavior(
      saveGameObject,
      SpacecraftManagerBehavior
    );
    if (!spaceBehavior) {
      return [];
    }

    return spaceBehavior.templateData.destinations;
  }
);

export interface StateProps {
  planets: SpacecraftDestination[];
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  planets: planetsSelector
});
export default mapStateToProps;
