import { AppState } from "@/store";

import saveEditorStateSelector from "./save-editor-state";

const loadingStateSelector = (state: AppState) =>
  saveEditorStateSelector(state).loadingState;
export default loadingStateSelector;
