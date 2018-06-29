import { SaveGame } from "oni-save-parser";
import createCachedSelector from "re-reselect";

import { AppState } from "@/state";

import {
  getSaveItemTitle,
  getSaveItemChildPaths
} from "@/services/save-structure";

import oniSaveSelector from "@/selectors/oni-save-selector";

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

const childPaths = createCachedSelector<
  AppState,
  SaveStructureItemProps,
  string[],
  SaveGame | null,
  string[][]
>(
  itemPathSelector,
  oniSaveSelector,
  (path, saveGame) => (saveGame ? getSaveItemChildPaths(path, saveGame) : [])
)(cacheKeyGenerator);

const mapStateToProps = function(
  state: AppState,
  props: SaveStructureItemProps
) {
  // Do not use createStructuredSelector here, as that itself
  //  creates a selector that will go nuts over our multi instance props.
  const stateProps = {
    title: title(state, props),
    childPaths: childPaths(state, props)
  };

  return stateProps;
};
export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
