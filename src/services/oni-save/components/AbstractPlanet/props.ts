import { SpacecraftDestination } from "@/types/oni-save-parser";

export interface AbstractPlanetProps {
  planetId: number;
  children(props: AbstractPlanetRenderProps): React.ReactChild;
}

export interface AbstractPlanetRenderProps {
  planet: SpacecraftDestination | null;
  onPlanetModify(planet: Partial<SpacecraftDestination>): void;
}
