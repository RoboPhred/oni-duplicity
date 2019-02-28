import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import { LoadingStatus } from "../../state";
import { loadingStatusSelector } from "../../selectors/loading-status";

export interface StateProps {
  disabled: boolean;
}

export default createStructuredSelector<AppState, StateProps>({
  disabled: (state: AppState) => loadingStatusSelector(state) !== LoadingStatus.Ready
});
