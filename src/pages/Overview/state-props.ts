import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import { loadingStatusReadySelector } from "@/services/oni-save/selectors/loading-status";

export interface StateProps {
  saveAvailable: boolean;
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  saveAvailable: loadingStatusReadySelector
});

export default mapStateToProps;
