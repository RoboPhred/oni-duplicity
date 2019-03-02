import { AbstractPasteButtonProps } from "./props";
import { pasteBehaviors } from "../../actions/paste-behaviors";

const mapDispatchToProps = function(
  dispatch: Function,
  props: AbstractPasteButtonProps
) {
  return {
    onPaste: (behaviors: string[]) =>
      dispatch(pasteBehaviors(props.gameObjectId, behaviors))
  };
};
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;
export default mapDispatchToProps;
