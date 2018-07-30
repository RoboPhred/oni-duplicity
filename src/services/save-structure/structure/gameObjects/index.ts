import { GameObjectGroup, SaveGame } from "oni-save-parser";

import { SaveStructureDef } from "../types";

import { createGameObjectVariants } from "./gameObjectTypes";

const gameObjectGroupsStructure: SaveStructureDef<GameObjectGroup> = {
  $uiPathName(group: GameObjectGroup) {
    return group.name;
  },

  $uiChildren(group: GameObjectGroup) {
    return group.gameObjects.map((_, i) => ["gameObjects", `${i}`]);
  },

  $editor: "game-object-list",

  // We want to handle each game object type uniquely,
  //  but their uniqueness is keyed off the name of this group.
  // To handle this, we provide variants that match off the group's name.
  $variants: createGameObjectVariants(["gameObjects", "*"])
};

// HACK: Add recursion support to Storage
import { storageBehavior } from "./behaviors/storage";
(storageBehavior.extraData! as any)["*"].$variants = createGameObjectVariants(
  null
);

const gameObjectsStructure: SaveStructureDef<SaveGame["gameObjects"]> = {
  $editor: "game-object-group-list",

  // gameObjects is an array, so we use the fallback key to
  //  handle all items.
  "*": gameObjectGroupsStructure
};
export default gameObjectsStructure;
