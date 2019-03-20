import { AppState } from "@/state";

import { LoadingStatus } from "../../state";
import { loadingStatusSelector } from "../../selectors/loading-status";

import { createStructuredSelector } from "../utils";

const mapStateToProps = createStructuredSelector({
  disabled: (state: AppState) => isBusy(loadingStatusSelector(state))
});

export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;

function isBusy(status: LoadingStatus) {
  switch (status) {
    case LoadingStatus.Loading:
    case LoadingStatus.Saving:
      return true;
  }
  return false;
}
