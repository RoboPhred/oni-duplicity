import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import error from "@/selectors/error-selector";
import loadingState from "@/selectors/loading-state-selector";
import oniSave from "@/selectors/oni-save-selector";
import selectedPath from "@/selectors/selected-path";

const stateSelectors = {
  loadingState,
  oniSave,
  error,
  selectedPath
};
export type StateProps = StructuredStateProps<typeof stateSelectors>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  stateSelectors
);
export default mapStateToProps;
