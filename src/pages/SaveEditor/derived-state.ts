import { createStructuredSelector, createSelector } from "reselect";

import { AppState } from "@/state";

import {
  getSaveItemEditor,
  getSaveItemEditorProps
} from "@/services/save-structure";

import oniSave from "@/selectors/oni-save-selector";
import selectedPath from "@/selectors/selected-path-selector";

const stateSelectors = {
  editorType: createSelector(
    oniSave,
    selectedPath,
    (oniSave, selectedPath) =>
      (oniSave && getSaveItemEditor(selectedPath, oniSave)) || null
  ),
  editorProps: createSelector(
    oniSave,
    selectedPath,
    (oniSave, selectedPath) =>
      oniSave && getSaveItemEditorProps(selectedPath, oniSave)
  )
};
export type StateProps = StructuredStateProps<typeof stateSelectors>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  stateSelectors
);
export default mapStateToProps;
