import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import { loadingStatusSelector } from "@/services/oni-save/selectors/loading-status";
import { LoadingStatus } from "@/services/oni-save/state";

export interface StateProps {
  noSave: boolean;
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  noSave: (state: AppState) =>
    loadingStatusSelector(state) === LoadingStatus.Idle
});
export default mapStateToProps;
