import { createSelector, createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import { spaceManagerSelector } from "../../selectors/space-manager";

const planetIdsSelector = createSelector(
  spaceManagerSelector,
  spaceManager => {
    if (!spaceManager) {
      return [];
    }

    return spaceManager.destinations.map(x => x.id);
  }
);

export interface StateProps {
  planetIds: number[];
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  planetIds: planetIdsSelector
});
export default mapStateToProps;
