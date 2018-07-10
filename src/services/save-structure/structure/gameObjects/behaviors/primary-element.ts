import { PrimaryElementBehavior } from "oni-save-parser";

import { SaveStructureDef } from "../../types";
import { behaviorIs } from "../../matchers";

import { defaultBehavior } from "./default";

export const primaryElementBehavior: SaveStructureDef<PrimaryElementBehavior> = {
  ...defaultBehavior,
  $advanced: false,

  $match: behaviorIs(PrimaryElementBehavior)
};
