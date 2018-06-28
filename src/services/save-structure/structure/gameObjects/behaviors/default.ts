import { SaveStructureItem } from "@/services/save-structure/types";
import { GameObjectBehavior } from "oni-save-parser";

export const defaultBehavior: SaveStructureItem<GameObjectBehavior> = {
  $title(behavior: GameObjectBehavior) {
    return behavior.name;
  }
};
