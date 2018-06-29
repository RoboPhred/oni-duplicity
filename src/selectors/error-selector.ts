import { AppState } from "@/state";

const errorSelector = (state: AppState) => state.error;
export default errorSelector;
