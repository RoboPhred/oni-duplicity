import { AppState } from "@/store";

import saveEditorStateSelector from "./save-editor-state";

const errorSelector = (state: AppState) => saveEditorStateSelector(state).error;
export default errorSelector;
