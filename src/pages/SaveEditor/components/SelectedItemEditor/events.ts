import { modifyOniSave } from "@/pages/SaveEditor/actions/modify-onisave";

const mapDispatchToProps = {
  onModify: modifyOniSave
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
