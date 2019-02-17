import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import { LoadingStatus } from "../../state";
import { loadingStatusSelector } from "../../selectors/loading-status";

export interface StateProps {
  loadingStatus: LoadingStatus;
}
export default createStructuredSelector<AppState, StateProps>({
  loadingStatus: loadingStatusSelector
});
