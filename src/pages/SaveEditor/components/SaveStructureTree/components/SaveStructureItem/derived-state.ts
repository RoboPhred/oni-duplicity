import createCachedSelector from "re-reselect";

import { get, isObject } from "lodash-es";

import { AppState } from "@/store";

import {
  getSaveItemTitle,
  getSaveItemChildPaths
} from "@/services/save-structure";

import oniSaveSelector from "@/pages/SaveEditor/selectors/oni-save-selector";

import { SaveStructureItemProps } from "./props";

const saveItemPath = (_: AppState, props: SaveStructureItemProps) =>
  props.saveItemPath;

const saveItemValue = createCachedSelector(
  oniSaveSelector,
  saveItemPath,
  (save, path) => {
    if (!save) {
      return undefined;
    }
    if (path.length === 0) {
      return save;
    }
    return get(save, path);
  }
)((_: AppState, props: SaveStructureItemProps) => props.saveItemPath.join("."));

const title = (state: AppState, props: SaveStructureItemProps) => {
  const path = props.saveItemPath;
  if (path.length === 0) {
    return "SaveGame";
  }

  const value = saveItemValue(state, props);
  let title = getSaveItemTitle(value, path, state.pages.saveEditor.oniSave);
  if (!title) {
    // Couldn't figure out name.  Use key.
    title = path[path.length - 1];
  }
  return title;
};

const childPaths = createCachedSelector(
  saveItemValue,
  saveItemPath,
  (value, path): string[][] => {
    return getSaveItemChildPaths(value, path);
  }
)((_: AppState, props: SaveStructureItemProps) => props.saveItemPath.join("."));

const structuredSelector = {
  title,
  childPaths
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
// const mapStateToProps = createStructuredSelector<
//   AppState,
//   SaveStructureItemProps,
//   StateProps
// >(structuredSelector);
function mapStateToProps(
  state: AppState,
  props: SaveStructureItemProps
): StateProps {
  return {
    title: title(state, props),
    childPaths: childPaths(state, props)
  };
}
export default mapStateToProps;
