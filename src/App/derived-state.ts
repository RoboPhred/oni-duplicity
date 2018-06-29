import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import error from "@/selectors/error-selector";
import loadingState from "@/selectors/loading-state-selector";

const stateSelectors = {
  loadingState,
  error
};
export type StateProps = StructuredStateProps<typeof stateSelectors>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  stateSelectors
);
export default mapStateToProps;
