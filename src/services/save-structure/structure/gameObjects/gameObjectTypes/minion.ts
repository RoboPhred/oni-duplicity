import {
  GameObject,
  MinionIdentityBehavior,
  getBehavior
} from "oni-save-parser";

import { SaveStructureDef } from "../../types";

import { defaultGameObject } from "./default";

const minionGameObject: SaveStructureDef<GameObject> = {
  ...defaultGameObject,

  $subType: "Minion",

  $uiPathName: (obj: GameObject) => {
    const identityBehavior = getBehavior(obj, MinionIdentityBehavior);
    const name =
      (identityBehavior &&
        identityBehavior.templateData &&
        identityBehavior.templateData.name) ||
      "[malformed]";
    return name;
  }
};

export const gameObjectName = "Minion";
export const gameObjectStructure = minionGameObject;

export default minionGameObject;
