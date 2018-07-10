import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import error from "@/selectors/error";
import loadingState from "@/selectors/loading-state";

const stateSelectors = {
  loadingState,
  error
};
export type StateProps = StructuredStateProps<typeof stateSelectors>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  stateSelectors
);
export default mapStateToProps;
