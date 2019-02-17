import { loadOniSave } from "../../actions/load-onisave";
import { saveOniSave } from "../../actions/save-onisave";

const mapDispatchToProps = {
  loadOniSave,
  saveOniSave
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
