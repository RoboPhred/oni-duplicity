import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import { loadingStatusLoadingSelector } from "@/services/oni-save/selectors/loading-status";

export interface StateProps {
  isLoading: boolean;
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  isLoading: loadingStatusLoadingSelector
});

export default mapStateToProps;
