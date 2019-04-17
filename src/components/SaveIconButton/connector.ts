import { createSelector } from "reselect";
import { connect } from "react-redux";

import { createStructuredSelector } from "@/state";

import { LoadingStatus } from "@/services/oni-save/state";
import { isMockSelector } from "@/services/oni-save/selectors/save-game";
import { loadingStatusSelector } from "@/services/oni-save/selectors/loading-status";

import { saveOniSave } from "@/services/oni-save/actions/save-onisave";

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

const mapDispatchToProps = {
  onSave: () => saveOniSave()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
