import { GameObjectGroup, SaveGame } from "oni-save-parser";

import { SaveStructureDef } from "../../types";

import minionGameObjectGroup from "./minion";

import defaultGameObjectGroup from "./default";

const gameObjectGroupsStructure: SaveStructureDef<GameObjectGroup> = {
  $uiPathName(group: GameObjectGroup) {
    return group.name;
  },

  $uiChildren(group: GameObjectGroup) {
    return group.gameObjects.map((_, i) => ["gameObjects", `${i}`]);
  },

  // We want to handle each game object type uniquely,
  //  but their uniqueness is keyed off the name of this group.
  // To handle this, we provide variants that match off the group's name.
  $variants: [minionGameObjectGroup, defaultGameObjectGroup]
};

const gameObjectsStructure: SaveStructureDef<SaveGame["gameObjects"]> = {
  $editor: "game-object-groups",

  // gameObjects is an array, so we use the fallback key to
  //  handle all items.
  "*": gameObjectGroupsStructure
};
export default gameObjectsStructure;
