import testData from "@/__mocks__/save-game.json";

import { loadOniSave } from "@/pages/SaveEditor/actions/load-onisave";
import { saveOniSave } from "@/pages/SaveEditor/actions/save-onisave";

import { receiveOniSaveSuccess } from "@/pages/SaveEditor/actions/receive-onisave";

const mapDispatchToProps = {
  onLoad: loadOniSave,
  onLoadTestData: () => receiveOniSaveSuccess(testData),
  onSave: saveOniSave
};
export default mapDispatchToProps;
export type DispatchProps = typeof mapDispatchToProps;
