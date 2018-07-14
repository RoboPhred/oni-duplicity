import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import { getSelectedGameObjectTraits } from "@/selectors/behaviors/ai-traits";

const structuredSelector = {
  traits: getSelectedGameObjectTraits
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
