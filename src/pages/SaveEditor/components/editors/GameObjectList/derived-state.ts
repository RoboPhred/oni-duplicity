import { createStructuredSelector, createSelector } from "reselect";

import { GameObjectGroup } from "oni-save-parser";

import { get } from "lodash-es";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save";
import selectedPath from "@/selectors/selected-path";

import { getSaveItemTitle } from "@/services/save-structure";

export interface GameObjectItem {
  name: string;
  path: string[];
}

const gameObjectItems = createSelector(
  oniSave,
  selectedPath,
  (oniSave, selectedPath) => {
    if (!oniSave) {
      return [];
    }

    const group: GameObjectGroup = get(oniSave, selectedPath);
    if (!group) {
      return [];
    }

    return group.gameObjects.map((x, i) => {
      const path = [...selectedPath, "gameObjects", `${i}`];
      const name = getSaveItemTitle(path, oniSave);
      const item: GameObjectItem = {
        name,
        path
      };
      return item;
    });
  }
);

const structuredSelector = {
  gameObjectItems
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
