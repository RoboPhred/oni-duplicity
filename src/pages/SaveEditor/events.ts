import testData from "@/__mocks__/save-game.json";

import { loadOniSave } from "./actions/load-onisave";
import { saveOniSave } from "./actions/save-onisave";

import { receiveOniSaveSuccess } from "./actions/receive-onisave";

const mapDispatchToProps = {
  onLoad: loadOniSave,
  onLoadTestData: () => receiveOniSaveSuccess(testData),
  onSave: saveOniSave
};
export default mapDispatchToProps;
export type DispatchProps = typeof mapDispatchToProps;
