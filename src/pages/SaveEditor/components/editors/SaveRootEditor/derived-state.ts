import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save";

const structuredSelector = {
  oniSave
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
