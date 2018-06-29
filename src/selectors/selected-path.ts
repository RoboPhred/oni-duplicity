import { AppState } from "@/state";

const selectedPathSelector = (state: AppState) => state.selectedPath;
export default selectedPathSelector;
