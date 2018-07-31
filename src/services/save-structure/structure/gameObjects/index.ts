import { GameObjectGroup, SaveGame } from "oni-save-parser";

import { SaveStructureDef } from "../types";

import {
  getGameObjectVariants,
  gameObjectVariantInfos
} from "./gameObjectTypes";
import { initStorageBehaviorHack } from "@/services/save-structure/structure/gameObjects/behaviors/storage";

const gameObjectGroupsStructure: SaveStructureDef<GameObjectGroup> = {
  $uiPathName(group: GameObjectGroup) {
    return group.name;
  },

  $uiChildren(group: GameObjectGroup) {
    return group.gameObjects.map((_, i) => ["gameObjects", `${i}`]);
  },

  $editor: "game-object-list",

  // This will be populated after object instantiation, to
  //  allow us to define circular references for nested
  //  game objects in the Storage behavior.
  $variants: []
};

// We want to handle each game object type uniquely,
//  but their uniqueness is keyed off the name of this group.
// To handle this, we provide variants that match off the group's name.
gameObjectGroupsStructure.$variants = getGameObjectVariants(
  gameObjectVariantInfos,
  ["gameObjects", "*"]
);

// Need to wait until after getGameObjectVariants completes
initStorageBehaviorHack();

const gameObjectsStructure: SaveStructureDef<SaveGame["gameObjects"]> = {
  $editor: "game-object-group-list",

  // gameObjects is an array, so we use the fallback key to
  //  handle all items.
  "*": gameObjectGroupsStructure
};
export default gameObjectsStructure;
