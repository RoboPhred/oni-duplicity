import { Dispatch } from "redux";
import { connect } from "react-redux";

import { AppState } from "@/state";
import { pasteBehaviors } from "@/services/oni-save/actions/paste-behaviors";
import { gameObjectTypesByIdSelector } from "@/services/oni-save/selectors/game-objects";
import { copyPasteGameObjectTypeSelect } from "@/services/oni-save/selectors/copy-paste";

export interface PasteMenuItemInputProps {
  gameObjectId: number;
}

function mapStateToProps(state: AppState, props: PasteMenuItemInputProps) {
  const typesById = gameObjectTypesByIdSelector(state);
  return {
    disabled:
      !typesById[props.gameObjectId] ||
      copyPasteGameObjectTypeSelect(state) !== typesById[props.gameObjectId]
  };
}
export type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = function(
  dispatch: Dispatch,
  props: PasteMenuItemInputProps
) {
  return {
    onPasteBehaviors: () => dispatch(pasteBehaviors(props.gameObjectId))
  };
};
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect<
  StateProps,
  DispatchProps,
  PasteMenuItemInputProps,
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
);
