import { GameObjectGroup, SaveGame } from "oni-save-parser";

import { SaveStructureItem } from "../../types";

import minionGameObjectGroup from "./minion";

import defaultGameObjectGroup from "./default";

const gameObjectGroupsStructure: SaveStructureItem<GameObjectGroup> = {
  $title(group: GameObjectGroup) {
    return group.name;
  },

  $selectEditorValue: ["gameObjects"],
  $selectChildRoot: ["gameObjects"],

  // We want to handle each game object type uniquely,
  //  but their uniqueness is keyed off the name of this group.
  // To handle this, we provide variants that match off the group's name.
  $variants: [minionGameObjectGroup, defaultGameObjectGroup]
};

const gameObjectsStructure: SaveStructureItem<SaveGame["gameObjects"]> = {
  // gameObjects is an array, so we use the fallback key to
  //  handle all items.
  "*": gameObjectGroupsStructure
};
export default gameObjectsStructure;
