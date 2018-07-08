import {
  GameObject,
  MinionIdentityBehavior,
  getBehavior,
  GameObjectGroup
} from "oni-save-parser";

import { SaveStructureDef } from "@/services/save-structure/structure/types";

import { gameObjectIs } from "../matchers";

import defaultGameObjectGroup, { defaultGameObject } from "./default";

const minionGameObjectGroup: SaveStructureDef<GameObjectGroup> = {
  ...defaultGameObjectGroup,

  // Only apply this rule to minion game object groups.
  $match: gameObjectIs("Minion"),

  // gameObjects in a gameObject group is an array of GameObject
  gameObjects: {
    ...defaultGameObjectGroup.gameObjects,

    "*": {
      ...defaultGameObject,

      $editor: "game-object-minion",

      $uiPathName: (obj: GameObject) => {
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
export default minionGameObjectGroup;
