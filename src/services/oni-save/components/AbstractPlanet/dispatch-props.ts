import { Dispatch } from "redux";

import { SpacecraftDestination } from "@/types/oni-save-parser";

import { modifyPlanet } from "../../actions/modify-planet";

import { AbstractPlanetProps } from "./props";

export default function mapDispatchToProps(
  dispatch: Dispatch,
  props: AbstractPlanetProps
) {
  return {
    onPlanetModify(planet: Partial<SpacecraftDestination>) {
      dispatch(modifyPlanet(props.planetId, planet));
    }
  };
}
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;
