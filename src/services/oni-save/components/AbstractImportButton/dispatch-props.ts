import { AbstractImportButtonProps } from "./props";
import { importBehaviors } from "../../actions/import-behaviors";

const mapDispatchToProps = function(
  dispatch: Function,
  props: AbstractImportButtonProps
) {
  return {
    onImport: (file: File) =>
      dispatch(importBehaviors(props.gameObjectId, file))
  };
};
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;
export default mapDispatchToProps;
