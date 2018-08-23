import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import selectedPath from "@/selectors/selected-path";

const structuredSelector = {
  gameObjectPath: selectedPath
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
