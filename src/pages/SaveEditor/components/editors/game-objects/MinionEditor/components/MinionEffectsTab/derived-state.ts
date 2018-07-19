import { createStructuredSelector } from "reselect";

import { AIEffectsBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import { getCurrentGameObjectBehaviorPropertySelector } from "@/selectors/behaviors/utils";

const effects = getCurrentGameObjectBehaviorPropertySelector<
  AIEffectsBehavior,
  AIEffectsBehavior["templateData"]["saveLoadEffects"]
>(AIEffectsBehavior, ["templateData", "saveLoadEffects"]);

const structuredSelector = {
  effects
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
