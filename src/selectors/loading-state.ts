import { AppState } from "@/state";

const loadingStateSelector = (state: AppState) => state.loadingState;
export default loadingStateSelector;
