import {
  GameObjectGroup,
  GameObject,
  getBehavior,
  KPrefabIDBehavior
} from "oni-save-parser";

import { SaveStructureDef } from "../types";

import { defaultBehavior } from "./behaviors/default";

export const defaultGameObject = {
  $uiPathName: (obj: GameObject) => {
    const idBehavior = getBehavior(obj, KPrefabIDBehavior);
    const id =
      (idBehavior &&
        idBehavior.templateData &&
        idBehavior.templateData.InstanceID) ||
      "[malformed]";
    const pos = `(${obj.position.x.toFixed(0)}, ${obj.position.y.toFixed(0)})`;
    return `#${id} ${pos}`;
  },

  $selectChildRoot: ["behaviors"],

  behaviors: {
    "*": defaultBehavior
  }
};

const defaultGameObjectGroup: SaveStructureDef<GameObjectGroup> = {
  gameObjects: {
    $uiPathName: false,
    "*": defaultGameObject
  }
};
export default defaultGameObjectGroup;
