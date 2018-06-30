import { createStructuredSelector, createSelector } from "reselect";

import { AppState } from "@/state";

import { getSaveItemEditor } from "@/services/save-structure";

import oniSave from "@/selectors/oni-save-selector";
import selectedPath from "@/selectors/selected-path";

const stateSelectors = {
  editorType: createSelector(
    oniSave,
    selectedPath,
    (oniSave, selectedPath) =>
      (oniSave && getSaveItemEditor(selectedPath, oniSave)) || null
  )
};
export type StateProps = StructuredStateProps<typeof stateSelectors>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  stateSelectors
);
export default mapStateToProps;
