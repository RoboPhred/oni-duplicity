import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import error from "@/selectors/error-selector";
import loadingState from "@/selectors/loading-state-selector";
import oniSave from "@/selectors/oni-save-selector";

const stateSelectors = {
  loadingState,
  oniSave,
  error
};
export type StateProps = StructuredStateProps<typeof stateSelectors>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  stateSelectors
);
export default mapStateToProps;
