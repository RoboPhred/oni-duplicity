import { AppState } from "@/state";

import {
  loadingStatusLoadingSelector,
  loadingStatusMessageSelector
} from "../../selectors/loading-status";

function mapStateToProps(state: AppState) {
  return {
    isLoading: loadingStatusLoadingSelector(state),
    message: loadingStatusMessageSelector(state)
  };
}
export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
