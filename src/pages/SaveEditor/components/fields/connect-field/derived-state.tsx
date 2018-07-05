import createCachedSelector from "re-reselect";

import { get } from "lodash-es";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save-selector";

import { EditorFieldProps } from "./props";

const itemPathSelector = (_: AppState, props: EditorFieldProps) => props.path;

const cacheKeyGenerator = (_: AppState, props: EditorFieldProps) =>
  props.path.join(".");

const itemValue = createCachedSelector(
  itemPathSelector,
  oniSave,
  (path, oniSave) => {
    if (path.length === 0) {
      return oniSave;
    }
    const val = get(oniSave, path);
    console.log("itemValue on path", path, "of", oniSave, "is", val);
    return val;
  }
)(cacheKeyGenerator);

function mapStateToProps(state: AppState, props: EditorFieldProps) {
  return {
    value: itemValue(state, props)
  };
}
export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
