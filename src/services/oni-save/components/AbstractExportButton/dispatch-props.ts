import { AbstractExportButtonProps } from "./props";
import { exportBehaviors } from "../../actions/export-behaviors";

const mapDispatchToProps = function(
  dispatch: Function,
  props: AbstractExportButtonProps
) {
  return {
    onExport: (behaviors: string[]) =>
      dispatch(exportBehaviors(props.gameObjectId, behaviors))
  };
};
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;
export default mapDispatchToProps;
