import { SaveGame } from "oni-save-parser";
import createCachedSelector from "re-reselect";

import naturalCompare from "string-natural-compare";

import { AppState } from "@/state";

import {
  EditMode,
  getSaveItemTitle,
  getSaveItemChildPaths
} from "@/services/save-structure";

import oniSaveSelector from "@/selectors/oni-save";
import selectedPathSelector from "@/selectors/selected-path";
import editModeSelector from "@/selectors/edit-mode";

import { SaveStructureItemProps } from "./props";

const cacheKeyGenerator = (_: AppState, props: SaveStructureItemProps) =>
  props.saveItemPath.join(".");

const itemPathSelector = (_: AppState, props: SaveStructureItemProps) =>
  props.saveItemPath;

const title = createCachedSelector<
  AppState,
  SaveStructureItemProps,
  string[],
  SaveGame | null,
  string
>(
  itemPathSelector,
  oniSaveSelector,
  (path, saveGame) =>
    saveGame ? getSaveItemTitle(path, saveGame) : "[undefined]"
)(cacheKeyGenerator);

const selectionStatus = createCachedSelector<
  AppState,
  SaveStructureItemProps,
  string[],
  string[],
  "unselected" | "in-path" | "selected"
>(itemPathSelector, selectedPathSelector, (itemPath, selectedPath) => {
  const isSelected = itemPath.every((x, i) => selectedPath[i] == x);
  if (!isSelected) {
    return "unselected";
  }

  if (itemPath.length === selectedPath.length) {
    return "selected";
  }

  return "in-path";
})(cacheKeyGenerator);

const childPaths = createCachedSelector<
  AppState,
  SaveStructureItemProps,
  string[],
  SaveGame | null,
  EditMode,
  string[][]
>(
  itemPathSelector,
  oniSaveSelector,
  editModeSelector,
  (path, saveGame, editMode) => {
    if (saveGame == null) {
      return [];
    }

    // Note: This is a pretty heavy operation.  We recurse the save
    //  to find the child items, then scan every path for both
    //  items during sort.
    const childItems = getSaveItemChildPaths(path, saveGame, editMode);
    return childItems.sort((a, b) => {
      const aTitle = getSaveItemTitle(a, saveGame);
      const bTitle = getSaveItemTitle(b, saveGame);
      return naturalCompare(aTitle, bTitle);
    });
  }
)(cacheKeyGenerator);

const mapStateToProps = function(
  state: AppState,
  props: SaveStructureItemProps
) {
  // Do not use createStructuredSelector here, as that itself
  //  creates a selector that will go nuts over our multi instance props.
  const stateProps = {
    title: title(state, props),
    selectionStatus: selectionStatus(state, props),
    childPaths: childPaths(state, props)
  };

  return stateProps;
};
export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
