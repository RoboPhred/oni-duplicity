import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

const structuredSelector = {};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
