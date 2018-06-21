import { loadOniSave } from "./actions/load-onisave";
import { saveOniSave } from "./actions/save-onisave";

const mapDispatchToProps = {
  onLoad: loadOniSave,
  onSave: saveOniSave
};
export default mapDispatchToProps;
export type DispatchProps = typeof mapDispatchToProps;
