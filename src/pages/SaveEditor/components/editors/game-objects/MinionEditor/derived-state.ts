import { createStructuredSelector, createSelector } from "reselect";
import { MinionIdentityBehavior, GameObject } from "oni-save-parser";

import { AppState } from "@/state";

import selectedPath from "@/selectors/selected-path";
import oniSave from "@/selectors/oni-save";
import { get } from "lodash-es";

const structuredSelector = {
  gameObjectPath: selectedPath,
  minionNamePath: createSelector(selectedPath, oniSave, (path, oniSave) => {
    const gameObject: GameObject = get(oniSave, path);
    if (!gameObject) {
      return null;
    }
    const behaviorIndex = gameObject.behaviors.findIndex(
      x => x.name === MinionIdentityBehavior
    );
    if (behaviorIndex === -1) {
      return null;
    }
    return [...path, "behaviors", `${behaviorIndex}`, "templateData", "name"];
  })
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
