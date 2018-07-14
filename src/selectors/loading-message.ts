import { AppState } from "@/state";

const loadingProgressMessageSelector = (state: AppState) =>
  state.loadingProgressMessage;
export default loadingProgressMessageSelector;
