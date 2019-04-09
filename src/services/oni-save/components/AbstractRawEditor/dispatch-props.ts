import { modifyRaw } from "../../actions/modify-raw";

const mapDispatchToProps = {
  onModifySave: modifyRaw
};

export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
