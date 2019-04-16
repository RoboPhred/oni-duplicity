import createCachedSelector from "re-reselect";
import { find } from "lodash-es";

import { AppState, createStructuredSelector } from "@/state";

import { spaceManagerSelector } from "../../selectors/space-manager";

import { AbstractPlanetProps } from "./props";

const planetIdSelector = (_: AppState, props: AbstractPlanetProps) =>
  props.planetId;

const planetSelector = createCachedSelector(
  spaceManagerSelector,
  planetIdSelector,
  (spaceManager, planetId) => {
    if (!spaceManager) {
      return null;
    }

    const planet = find(spaceManager.destinations, x => x.id === planetId);
    return planet || null;
  }
)(planetIdSelector);

const mapStateToProps = createStructuredSelector({
  planet: planetSelector
});

export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
