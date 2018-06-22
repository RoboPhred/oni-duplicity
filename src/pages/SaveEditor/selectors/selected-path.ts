import { AppState } from "@/store";

const selectedPathSelector = (state: AppState) =>
  state.pages.saveEditor.selectedPath;
export default selectedPathSelector;
