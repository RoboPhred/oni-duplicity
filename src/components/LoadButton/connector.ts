import { connect } from "react-redux";

import { AppState } from "@/state";

import { createStructuredSelector } from "@/state";

import { LoadingStatus } from "@/services/oni-save/state";
import { loadingStatusSelector } from "@/services/oni-save/selectors/loading-status";

import { loadOniSave } from "@/services/oni-save/actions/load-onisave";

function isBusy(status: LoadingStatus) {
  switch (status) {
    case LoadingStatus.Loading:
    case LoadingStatus.Saving:
      return true;
  }
  return false;
}

const mapStateToProps = createStructuredSelector({
  disabled: (state: AppState) => isBusy(loadingStatusSelector(state))
});

const mapDispatchToProps = {
  onLoadSave: loadOniSave
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
