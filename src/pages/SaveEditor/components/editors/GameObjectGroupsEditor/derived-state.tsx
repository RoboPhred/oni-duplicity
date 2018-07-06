import { createStructuredSelector, createSelector } from "reselect";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save-selector";

export interface GroupItem {
  name: string;
  count: number;
  path: string[];
}

const gameObjectGroups = createSelector(oniSave, oniSave => {
  if (!oniSave) {
    return [];
  }

  return oniSave.gameObjects.map((x, i) => {
    const item: GroupItem = {
      name: x.name,
      count: x.gameObjects.length,
      path: ["gameObjects", `${i}`]
    };
    return item;
  });
});

const structuredSelector = {
  gameObjectGroups
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
