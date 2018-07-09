import {
  GameObject,
  MinionIdentityBehavior,
  getBehavior,
  GameObjectGroup
} from "oni-save-parser";

import { SaveStructureDef } from "@/services/save-structure/structure/types";

import { gameObjectIs } from "../matchers";

import defaultGameObjectGroup, { defaultGameObject } from "./default";

const minionGameObject: SaveStructureDef<GameObject> = {
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
};

const minionGameObjectGroup: SaveStructureDef<GameObjectGroup> = {
  ...defaultGameObjectGroup,

  $advanced: false,

  // Only apply this rule to minion game object groups.
  $match: gameObjectIs("Minion"),

  // gameObjects in a gameObject group is an array of GameObject
  gameObjects: {
    ...defaultGameObjectGroup.gameObjects,

    "*": minionGameObject
  }
};
export default minionGameObjectGroup;
