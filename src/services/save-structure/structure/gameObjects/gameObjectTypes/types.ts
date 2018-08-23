import { GameObject } from "oni-save-parser";

import { SaveStructureDef } from "../../types";

export interface GameObjectTypeInfo {
  gameObjectMatcher(obj: any): boolean;
  gameObjectStructure: SaveStructureDef<GameObject>;
}
