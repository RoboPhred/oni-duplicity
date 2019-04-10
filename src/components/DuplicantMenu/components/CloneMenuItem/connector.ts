import { connect } from "react-redux";
import { Dispatch } from "redux";

import { AppState } from "@/state";
import { cloneDuplicant } from "@/services/oni-save/actions/clone-duplicant";

export interface CloneMenuItemInputProps {
  gameObjectId: number;
}

function mapDispatchToProps(
  dispatch: Dispatch,
  props: CloneMenuItemInputProps
) {
  return {
    onCloneDuplicant: () => dispatch(cloneDuplicant(props.gameObjectId))
  };
}
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect<{}, DispatchProps, CloneMenuItemInputProps, AppState>(
  null,
  mapDispatchToProps
);
