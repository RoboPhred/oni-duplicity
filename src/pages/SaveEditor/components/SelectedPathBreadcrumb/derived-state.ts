import { createStructuredSelector } from "reselect";

import { AppState } from "@/store";

import selectedPath from "@/pages/SaveEditor/selectors/selected-path";

const structuredSelector = {
  selectedPath
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
export default createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
