import { SpacecraftDestination } from "@/types/oni-save-parser";

export interface AbstractPlanetListProps {
  children(props: AbstractPlanetListRenderProps): React.ReactChild;
}
export interface AbstractPlanetListRenderProps {
  planetIds: number[];
}
