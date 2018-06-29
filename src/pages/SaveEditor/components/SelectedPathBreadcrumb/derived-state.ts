import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import selectedPath from "@/selectors/selected-path";

const structuredSelector = {
  selectedPath
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
export default createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
