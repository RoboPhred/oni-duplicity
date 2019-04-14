import { Dispatch } from "redux";
import { connect } from "react-redux";

import { AppState } from "@/state";
import { copyBehaviors } from "@/services/oni-save/actions/copy-behaviors";

export interface CopyMenuItemInputProps {
  gameObjectId: number;
}

const mapDispatchToProps = function(
  dispatch: Dispatch,
  props: CopyMenuItemInputProps
) {
  return {
    onCopyBehaviors: (behaviors: string[]) =>
      dispatch(copyBehaviors(props.gameObjectId, behaviors))
  };
};
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect<{}, DispatchProps, CopyMenuItemInputProps, AppState>(
  null,
  mapDispatchToProps
);
