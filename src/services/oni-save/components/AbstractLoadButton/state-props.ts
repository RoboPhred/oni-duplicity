import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import { LoadingStatus } from "../../state";
import { loadingStatusSelector } from "../../selectors/loading-status";

export interface StateProps {
  disabled: boolean;
}

const busyStatii = [LoadingStatus.Loading, LoadingStatus.Saving];

export default createStructuredSelector<AppState, StateProps>({
  disabled: (state: AppState) =>
    busyStatii.indexOf(loadingStatusSelector(state)) !== -1
});
