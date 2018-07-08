import { createStructuredSelector, createSelector } from "reselect";

import { AppState } from "@/state";

import { getSaveItemTitle } from "@/services/save-structure";

import selectedPath from "@/selectors/selected-path-selector";
import oniSave from "@/selectors/oni-save-selector";

const structuredSelector = {
  gameObjectPath: selectedPath,
  gameObjectName: createSelector(
    selectedPath,
    oniSave,
    (selectedPath, oniSave) => {
      if (!oniSave) {
        return "[no save loaded]";
      }
      return getSaveItemTitle(selectedPath, oniSave);
    }
  )
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
