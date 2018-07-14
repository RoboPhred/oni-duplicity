import { createStructuredSelector } from "reselect";

import { AIAttributeLevelsBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import { getCurrentGameObjectBehaviorPropertySelector } from "@/selectors/behaviors/utils";

const structuredSelector = {
  skills: getCurrentGameObjectBehaviorPropertySelector<
    AIAttributeLevelsBehavior,
    AIAttributeLevelsBehavior["templateData"]["saveLoadLevels"]
  >(AIAttributeLevelsBehavior, ["templateData", "saveLoadLevels"])
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
