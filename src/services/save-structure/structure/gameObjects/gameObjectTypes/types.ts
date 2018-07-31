import { GameObject } from "oni-save-parser";

import { SaveStructureDef } from "../../types";

export interface GameObjectTypeInfo {
  gameObjectName: string;
  gameObjectStructure: SaveStructureDef<GameObject>;
}
