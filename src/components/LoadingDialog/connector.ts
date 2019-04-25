import { connect } from "react-redux";

import { createStructuredSelector, AppState } from "@/state";

import {
  loadingStatusSelector,
  loadingStatusMessageSelector
} from "@/services/oni-save/selectors/loading-status";
import { LoadingStatus } from "@/services/oni-save/state";

const mapStateToProps = createStructuredSelector({
  isLoading: (state: AppState) =>
    loadingStatusSelector(state) === LoadingStatus.Loading,
  isSaving: (state: AppState) =>
    loadingStatusSelector(state) === LoadingStatus.Saving,
  message: loadingStatusMessageSelector
});

export default connect(mapStateToProps);
