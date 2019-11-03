import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SpaceDestination } from "oni-save-parser";

import { AppState } from "@/state";

import { planetSelector } from "../selectors/space-manager";
import { modifyPlanet } from "../actions/modify-planet";

export interface UsePlanet {
  planet: SpaceDestination | null;
  onModifyPlanet(planet: Partial<SpaceDestination>): void;
}

export default function usePlanet(planetId: number): UsePlanet {
  const dispatch = useDispatch();
  const planet = useSelector((state: AppState) => planetSelector(state, planetId));

  const onModifyPlanet = React.useCallback((planet: Partial<SpaceDestination>) => {
    dispatch(modifyPlanet(planetId, planet))
  }, [dispatch, planetId]);

  return {
    planet,
    onModifyPlanet
  };
}