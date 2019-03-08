import { AppState } from "@/state";

import {
  loadingStatusSelector,
  loadingStatusMessageSelector
} from "../../selectors/loading-status";

function mapStateToProps(state: AppState) {
  return {
    status: loadingStatusSelector(state),
    message: loadingStatusMessageSelector(state)
  };
}
export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
