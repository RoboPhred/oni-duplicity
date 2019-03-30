import { SpaceDestination } from "oni-save-parser";

export interface AbstractPlanetProps {
  planetId: number;
  children(props: AbstractPlanetRenderProps): React.ReactChild;
}

export interface AbstractPlanetRenderProps {
  planet: SpaceDestination | null;
  onPlanetModify(planet: Partial<SpaceDestination>): void;
}
