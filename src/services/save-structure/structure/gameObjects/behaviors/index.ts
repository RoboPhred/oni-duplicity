import { GameObjectBehavior } from "oni-save-parser";

import { defaultBehavior } from "./default";
import { storageBehavior } from "./storage";
import { SaveStructureDef } from "@/services/save-structure/structure";

const behavior: SaveStructureDef<GameObjectBehavior> = {
  $variants: [storageBehavior, defaultBehavior]
};
export default behavior;
