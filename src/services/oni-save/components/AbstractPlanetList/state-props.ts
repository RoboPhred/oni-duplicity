import { createSelector } from "reselect";

import { AppState } from "@/state";

import { spaceManagerSelector } from "../../selectors/space-manager";

import { createStructuredSelector } from "../utils";

const planetIdsSelector = createSelector(
  spaceManagerSelector,
  spaceManager => {
    if (!spaceManager) {
      return [];
    }

    return spaceManager.destinations.map(x => x.id);
  }
);

const mapStateToProps = createStructuredSelector({
  planetIds: planetIdsSelector
});

export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
