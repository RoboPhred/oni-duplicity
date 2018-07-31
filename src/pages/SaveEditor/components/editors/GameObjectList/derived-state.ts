import { createStructuredSelector, createSelector } from "reselect";

import { GameObjectGroup, GameObject } from "oni-save-parser";

import { get } from "lodash-es";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save";
import selectedPath from "@/selectors/selected-path";

import { getSaveItemTitle } from "@/services/save-structure";

import { GameObjectListProps } from "./props";

const isFlatListSelector = (_: AppState, props: GameObjectListProps) =>
  props.isFlatList || false;

export interface GameObjectItem {
  name: string;
  path: string[];
}

const gameObjectItems = createSelector(
  oniSave,
  selectedPath,
  isFlatListSelector,
  (oniSave, selectedPath, isFlatList) => {
    if (!oniSave) {
      return [];
    }

    let gameObjectPaths: string[][];
    if (isFlatList) {
      const gameObjects: GameObject[] = get(oniSave, selectedPath);
      gameObjectPaths = gameObjects.map((_, i) => [...selectedPath, `${i}`]);
    } else {
      const group: GameObjectGroup = get(oniSave, selectedPath);
      if (!group) {
        return [];
      }
      gameObjectPaths = group.gameObjects.map((_, i) => [
        ...selectedPath,
        "gameObjects",
        `${i}`
      ]);
    }

    return gameObjectPaths.map(path => {
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
const mapStateToProps = createStructuredSelector<
  AppState,
  GameObjectListProps,
  StateProps
>(structuredSelector);
export default mapStateToProps;
