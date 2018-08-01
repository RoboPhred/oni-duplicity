import { createStructuredSelector, createSelector } from "reselect";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save";
import selectedPath from "@/selectors/selected-path";

const stateSelectors = {
  oniSave,
  selectedPath
};
export type StateProps = StructuredStateProps<typeof stateSelectors>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  stateSelectors
);
export default mapStateToProps;
