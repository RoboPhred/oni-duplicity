import { createSelector, createStructuredSelector } from "reselect";

import { get } from "lodash-es";

import { AppState } from "@/store";

import oniSave from "@/pages/SaveEditor/selectors/oni-save-selector";
import selectedPath from "@/pages/SaveEditor/selectors/selected-path";

const structuredSelectors = {
  selectedPath,
  selectedValue: createSelector(
    selectedPath,
    oniSave,
    (selectedPath, oniSave) => {
      return selectedPath.length > 0 ? get(oniSave, selectedPath) : oniSave;
    }
  )
};
export type StateProps = StructuredStateProps<typeof structuredSelectors>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelectors
);
export default mapStateToProps;
