import { Dispatch } from "redux";
import { connect } from "react-redux";

import { AppState } from "@/state";
import { exportBehaviors } from "@/services/oni-save/actions/export-behaviors";

export interface ExportMenuItemInputProps {
  gameObjectId: number;
}

const mapDispatchToProps = function(
  dispatch: Dispatch,
  props: ExportMenuItemInputProps
) {
  return {
    onExportBehaviors: (behaviors: string[]) =>
      dispatch(exportBehaviors(props.gameObjectId, behaviors))
  };
};
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect<{}, DispatchProps, ExportMenuItemInputProps, AppState>(
  null,
  mapDispatchToProps
);
