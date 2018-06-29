import { dismissError } from "@/actions/dismiss-error";

const mapDispatchToProps = {
  onDismissError: dismissError
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
