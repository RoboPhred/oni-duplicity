import createCachedSelector from "re-reselect";
import { get } from "lodash-es";

import { AppState } from "@/state";

import { saveGameSelector } from "../../selectors/save-game";

import { createStructuredSelector } from "../utils";

import { AbstractRawEditorProps } from "./props";

const pathSelector = (_: AppState, props: AbstractRawEditorProps) => props.path;

const valueSelector = createCachedSelector(
  saveGameSelector,
  pathSelector,
  (saveGame, path) => {
    if (!saveGame) {
      return null;
    }
    return get(saveGame, path);
  }
)((_: AppState, props: AbstractRawEditorProps) => props.path.join("."));

const mapStateToProps = createStructuredSelector({
  value: valueSelector
});
export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
