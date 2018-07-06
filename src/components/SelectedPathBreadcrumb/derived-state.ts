import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import breadcrumb from "@/selectors/selected-path-breadcrumb-selector";

const structuredSelector = {
  breadcrumb
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
