import { AppState } from "@/state";
import { isSaveModifiedSelector } from "../../selectors/save-game";

function mapStateToProps(state: AppState) {
  return {
    hasChanges: isSaveModifiedSelector(state)
  };
}
export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
