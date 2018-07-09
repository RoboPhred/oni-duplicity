import { PrimaryElement, PrimaryElementBehavior } from "oni-save-parser";

import { SaveStructureDef } from "../../types";
import { behaviorIs } from "../../matchers";

import { defaultBehavior } from "./default";

export const primaryElementBehavior: SaveStructureDef<PrimaryElement> = {
  ...defaultBehavior,
  $advanced: false,

  $match: behaviorIs(PrimaryElementBehavior)
};
