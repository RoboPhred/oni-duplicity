import { AppState } from "@/state";
import {
  isSaveModifiedSelector,
  isMockSelector
} from "../../selectors/save-game";

function mapStateToProps(state: AppState) {
  return {
    hasChanges: isSaveModifiedSelector(state),
    isMock: isMockSelector(state)
  };
}
export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
