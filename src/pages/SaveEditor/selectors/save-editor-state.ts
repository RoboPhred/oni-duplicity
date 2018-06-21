import { AppState } from "@/store";

const saveEditorStateSelector = (state: AppState) => state.pages.saveEditor;
export default saveEditorStateSelector;
