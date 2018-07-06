import {
  GameObject,
  MinionIdentityBehavior,
  getBehavior,
  GameObjectGroup
} from "oni-save-parser";

import { SaveStructureDef } from "@/services/save-structure/types";

import { gameObjectIs } from "../utils";

import { defaultGameObject } from "./default";

const minionGameObject: SaveStructureDef<GameObjectGroup> = {
  // Only apply this rule to minion game object groups.
  $match: gameObjectIs("Minion"),

  // gameObjects in a gameObject group is an array of GameObject
  gameObjects: {
    "*": {
      ...defaultGameObject,

      $editor: "minion",

      $title: (obj: GameObject) => {
        const identityBehavior = getBehavior(obj, MinionIdentityBehavior);
        const name =
          (identityBehavior &&
            identityBehavior.templateData &&
            identityBehavior.templateData.name) ||
          "[malformed]";
        return name;
      }
    }
  }
};
export default minionGameObject;
