import {
  GameObject,
  getBehavior,
  KPrefabIDBehavior,
  GameObjectGroup
} from "oni-save-parser";

import { formatPosition } from "@/format";

import { SaveStructureDef } from "../../types";

import { defaultGameObject } from "./default";

const geyserGameObject: SaveStructureDef<GameObject> = {
  ...defaultGameObject,

  $editor: "game-object-geyser",

  $uiPathName: (obj: GameObject) => {
    const idBehavior = getBehavior(obj, KPrefabIDBehavior);
    const id =
      (idBehavior &&
        idBehavior.templateData &&
        idBehavior.templateData.InstanceID) ||
      "[malformed]";

    return `#${id} ${formatPosition(obj.position)}`;
  }
};

export const gameObjectMatcher = (obj: GameObjectGroup) =>
  obj.name.startsWith("GeyserGeneric_");
export const gameObjectStructure = geyserGameObject;

export default geyserGameObject;
