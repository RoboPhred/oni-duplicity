import { useSelector } from "react-redux";
import { planetIdsSelector } from "../selectors/space-manager";

export interface UsePlanets {
  planetIds: string[];
}

export default function usePlanets() {
  const planetIds = useSelector(planetIdsSelector);
  return {
    planetIds
  };
}