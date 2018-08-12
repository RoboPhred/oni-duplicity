import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import language from "@/selectors/language";

const stateSelectors = {
  language
};
export type StateProps = StructuredStateProps<typeof stateSelectors>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  stateSelectors
);
export default mapStateToProps;
