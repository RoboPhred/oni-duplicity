import { StorageBehavior, StoredGameObject } from "oni-save-parser";

import { forEach, isObject } from "lodash-es";

import { SaveStructureDef } from "../../types";
import { behaviorIs } from "../../matchers";

import {
  getGameObjectVariants,
  gameObjectVariantInfos
} from "../gameObjectTypes";

import { defaultBehavior } from "./default";

const storageBehaviorStoredObject: SaveStructureDef<StoredGameObject> = {
  $editor: "game-object-default",
  $uiPathName(obj: StoredGameObject, path: string[]) {
    const index = path[path.length - 1];
    return `${obj.name} (${index})`;
  },
  $variants: []
};

// We cannot do this until we finish the getGameObjectVariants call
//  for the game object group handler.
export function initStorageBehaviorHack() {
  // Set this up after we create the object, to allow for circular dependencies.
  storageBehaviorStoredObject.$variants = getGameObjectVariants(
    gameObjectVariantInfos,
    null
  );
}

const storageBehaviorExtraData: SaveStructureDef<
  StorageBehavior["extraData"]
> = {
  $uiPathName: "Stored Items",

  $editor: "game-object-list",
  $editorProps: {
    isFlatList: true
  },

  "*": storageBehaviorStoredObject
};

export const storageBehavior: SaveStructureDef<StorageBehavior> = {
  ...(defaultBehavior as any),

  $match: behaviorIs(StorageBehavior),

  $uiChildren(behavior: StorageBehavior) {
    const children: string[][] = [];
    if (
      behavior.templateData &&
      Object.keys(behavior.templateData).length > 0
    ) {
      forEach(behavior.templateData, (_, key) => {
        // Have to wipe the type here because lodash is being obstinate.
        //  It explicitly calls out that key must be string because 'the type may have properties not defined in the type'.
        //  Not sure why we have a type system if we aren't going to bother using it.
        if (isObject((behavior.templateData as any)[key])) {
          // As of the CU, all of these fields are value fields,
          //  so this does not execute.
          // Leaving it in for future-proofing.
          children.push(["templateData", key]);
        }
      });
    }

    if (behavior.extraData) {
      // extraData is aray of gameObjects stored in this storage.
      children.push(["extraData"]);
    }
    return children.length > 0 ? children : false;
  },

  extraData: storageBehaviorExtraData
};
