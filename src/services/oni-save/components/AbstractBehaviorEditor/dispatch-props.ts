import { modifyBehavior } from "../../actions/modify-behavior";

const mapDispatchToProps = {
  onModifyBehavior: modifyBehavior
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
