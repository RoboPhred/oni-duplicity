import { dismissError } from "./actions/dismiss-error";
import { selectPath } from "./actions/select-path";

const mapDispatchToProps = {
  onDismissError: dismissError,
  onSelectPath: selectPath
};
export default mapDispatchToProps;
export type DispatchProps = typeof mapDispatchToProps;
