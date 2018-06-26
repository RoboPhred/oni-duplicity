import {
  GameObject,
  GameObjectGroup,
  KPrefabIDBehavior,
  getBehavior,
  SaveGame
} from "oni-save-parser";

import minionGameObjectGroup from "./minion";
import { SaveStructureItem } from "@/services/save-structure/types";

const fallbackGameObjectGroup: SaveStructureItem<GameObjectGroup> = {
  gameObjects: {
    "*": {
      $title: (obj: GameObject) => {
        const idBehavior = getBehavior(obj, KPrefabIDBehavior);
        const id =
          (idBehavior &&
            idBehavior.templateData &&
            idBehavior.templateData.InstanceID) ||
          "[malformed]";
        const pos = `(${obj.position.x.toFixed(0)}, ${obj.position.y.toFixed(
          0
        )})`;
        return `#${id} ${pos}`;
      }
    }
  }
};

const gameObjectGroupsStructure: SaveStructureItem<GameObjectGroup> = {
  $title(group: GameObjectGroup) {
    return group.name;
  },

  $selectChildRoot: ["gameObjects"],

  // We want to handle each game object type uniquely,
  //  but their uniqueness is keyed off the name of this group.
  // To handle this, we provide variants that match off the group's name.
  $variants: [minionGameObjectGroup, fallbackGameObjectGroup]
};

const gameObjectsStructure: SaveStructureItem<SaveGame["gameObjects"]> = {
  // gameObjects is an array, so we use the fallback key to
  //  handle all items.
  "*": gameObjectGroupsStructure
};
export default gameObjectsStructure;
