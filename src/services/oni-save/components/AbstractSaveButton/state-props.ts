import { createSelector, createStructuredSelector } from "reselect";

import { isMockSelector } from "../../selectors/save-game";
import { loadingStatusSelector } from "../../selectors/loading-status";
import { LoadingStatus } from "../../state";
import { AppState } from "@/state";

const disabledSelector = createSelector(
  loadingStatusSelector,
  isMockSelector,
  (loadStatus, isMock) => {
    if (loadStatus !== LoadingStatus.Ready) {
      return true;
    }
    if (isMock) {
      return true;
    }
    return false;
  }
);

export interface StateProps {
  disabled: boolean;
}
const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  disabled: disabledSelector
});
export default mapStateToProps;
