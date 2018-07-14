import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import loadingState from "@/selectors/loading-state";
import loadingProgressMessageSelector from "@/selectors/loading-message";

const structuredSelector = {
  loadingState,
  loadingProgressMessageSelector
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
