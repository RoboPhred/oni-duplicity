import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import { getSelectedGameObjectPath } from "@/selectors/game-object";

const structuredSelector = {
  gameObjectPath: getSelectedGameObjectPath
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
