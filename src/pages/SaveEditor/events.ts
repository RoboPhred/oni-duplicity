import testData from "@/__mocks__/save-game.json";

import { dismissError } from "./actions/dismiss-error";
import { loadOniSave } from "./actions/load-onisave";
import { saveOniSave } from "./actions/save-onisave";
import { selectPath } from "./actions/select-path";

import { receiveOniSaveSuccess } from "./actions/receive-onisave";

const mapDispatchToProps = {
  onDismissError: dismissError,
  onLoad: loadOniSave,
  onLoadTestData: () => receiveOniSaveSuccess(testData),
  onSave: saveOniSave,
  onSelectPath: selectPath
};
export default mapDispatchToProps;
export type DispatchProps = typeof mapDispatchToProps;
