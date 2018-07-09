import { GameObject } from "oni-save-parser";

import { SaveStructureDef } from "../../types";

export interface GameObjectTypeInfo {
  name: string;
  structure: SaveStructureDef<GameObject>;
}
