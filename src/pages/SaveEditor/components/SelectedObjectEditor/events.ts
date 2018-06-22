import { modifyOniSave } from "@/pages/SaveEditor/actions/modify-onisave";
import { selectPath } from "@/pages/SaveEditor/actions/select-path";

const mapDispatchToProps = {
  onModify: modifyOniSave,
  onPathSelected: selectPath
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
