import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import { loadingStatusReadySelector } from "@/services/oni-save/selectors/loading-status";

export interface StateProps {
  enableSaveNavigation: boolean;
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  enableSaveNavigation: loadingStatusReadySelector
});

export default mapStateToProps;
