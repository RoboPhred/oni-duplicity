import { connect } from "react-redux";

import { AppState } from "@/state";
import { importBehaviors } from "@/services/oni-save/actions/import-behaviors";

export interface ImportMenuItemInputProps {
  gameObjectId: number;
}

const mapDispatchToProps = function(
  dispatch: Function,
  props: ImportMenuItemInputProps
) {
  return {
    onImportDuplicant: (file: File) =>
      dispatch(importBehaviors(props.gameObjectId, file))
  };
};
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect<{}, DispatchProps, ImportMenuItemInputProps, AppState>(
  null,
  mapDispatchToProps
);
