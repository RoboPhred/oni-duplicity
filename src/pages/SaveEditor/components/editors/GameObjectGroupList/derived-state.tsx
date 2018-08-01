import { createStructuredSelector, createSelector } from "reselect";

import { get } from "lodash-es";

import { GameObjectGroup } from "oni-save-parser";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save";
import { getSaveItemChildPaths } from "@/services/save-structure";
import editMode from "@/selectors/edit-mode";

export interface GroupItem {
  name: string;
  count: number;
  path: string[];
}

const gameObjectGroups = createSelector(
  oniSave,
  editMode,
  (oniSave, editMode) => {
    if (!oniSave) {
      return [];
    }

    const gameObjectPaths = getSaveItemChildPaths(
      ["gameObjects"],
      oniSave,
      editMode
    );

    return gameObjectPaths.map((path, i) => {
      const group = get(oniSave, path) as GameObjectGroup;
      const item: GroupItem = {
        name: group.name,
        count: group.gameObjects.length,
        path
      };
      return item;
    });
  }
);

const structuredSelector = {
  gameObjectGroups
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
