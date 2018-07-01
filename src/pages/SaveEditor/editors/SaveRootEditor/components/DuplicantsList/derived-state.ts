import { createStructuredSelector, createSelector } from "reselect";

import { range } from "lodash-es";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save-selector";

const duplicantsSetPath = createSelector(oniSave, oniSave => {
  if (!oniSave) {
    return null;
  }
  const index = oniSave.gameObjects.findIndex(x => x.name === "Minion");
  if (index === -1) {
    return null;
  }
  return ["gameObjects", `${index}`, "gameObjects"];
});

const duplicantIndexes = createSelector(oniSave, oniSave => {
  if (!oniSave) {
    return [];
  }
  const minionSet = oniSave.gameObjects.find(x => x.name === "Minion");
  if (!minionSet) {
    return [];
  }
  return range(minionSet.gameObjects.length);
});

const structuredSelector = {
  duplicantsSetPath,
  duplicantIndexes
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
