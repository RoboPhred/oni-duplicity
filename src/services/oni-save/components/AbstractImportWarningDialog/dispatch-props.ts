import { importConfirm } from "../../actions/import-behaviors";

const mapDispatchToProps = {
  onConfirm: () => importConfirm(true),
  onCancel: () => importConfirm(false)
};
export default mapDispatchToProps;
export type DispatchProps = typeof mapDispatchToProps;
