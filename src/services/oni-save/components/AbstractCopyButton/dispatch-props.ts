import { AbstractCopyButtonProps } from "./props";
import { copyBehaviors } from "../../actions/copy-behaviors";

const mapDispatchToProps = function(
  dispatch: Function,
  props: AbstractCopyButtonProps
) {
  return {
    onCopy: (behaviors: string[]) =>
      dispatch(copyBehaviors(props.gameObjectId, behaviors))
  };
};
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;
export default mapDispatchToProps;
