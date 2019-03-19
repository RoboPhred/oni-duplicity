import { createStructuredSelector } from "reselect";
import createCachedSelector from "re-reselect";
import { find } from "lodash-es";

import { AppState } from "@/state";

import { spaceManagerSelector } from "../../selectors/space-manager";

import { AbstractPlanetProps } from "./props";
import { SpacecraftDestination } from "@/types/oni-save-parser";

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

export interface StateProps {
  planet: SpacecraftDestination | null;
}

const mapStateToProps = createStructuredSelector<
  AppState,
  AbstractPlanetProps,
  StateProps
>({
  planet: planetSelector
});
export default mapStateToProps;
