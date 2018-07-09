import { GameObjectBehavior } from "oni-save-parser";

import { SaveStructureDef } from "../../../structure";

import { defaultBehavior } from "./default";
import { primaryElementBehavior } from "./primary-element";
import { storageBehavior } from "./storage";

const behavior: SaveStructureDef<GameObjectBehavior> = {
  $variants: [storageBehavior, primaryElementBehavior, defaultBehavior]
};
export default behavior;
