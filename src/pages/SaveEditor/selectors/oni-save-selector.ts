import { AppState } from "@/store";

import saveEditorStateSelector from "./save-editor-state";

const oniSaveSelector = (state: AppState) =>
  saveEditorStateSelector(state).oniSave;
export default oniSaveSelector;
