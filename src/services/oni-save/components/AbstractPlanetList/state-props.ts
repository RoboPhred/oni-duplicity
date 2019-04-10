import { createSelector } from "reselect";

import { createStructuredSelector } from "@/state";

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

const mapStateToProps = createStructuredSelector({
  planetIds: planetIdsSelector
});

export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
