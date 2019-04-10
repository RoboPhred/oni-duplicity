import { createSelector } from "reselect";

import { createStructuredSelector } from "@/state";

import { LoadingStatus } from "../../state";
import { isMockSelector } from "../../selectors/save-game";
import { loadingStatusSelector } from "../../selectors/loading-status";

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

const mapStateToProps = createStructuredSelector({
  disabled: disabledSelector
});

export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
