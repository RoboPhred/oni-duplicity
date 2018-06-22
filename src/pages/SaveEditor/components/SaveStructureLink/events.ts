import { selectPath } from "@/pages/SaveEditor/actions/select-path";

const mapDispatchToProps = {
  onClick: selectPath
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
