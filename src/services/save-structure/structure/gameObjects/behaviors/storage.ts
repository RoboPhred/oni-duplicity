import { StorageBehavior, StoredGameObject } from "oni-save-parser";

import { forEach, isObject } from "lodash-es";

import { SaveStructureDef } from "../../types";
import { behaviorIs } from "../../matchers";

import { defaultBehavior } from "./default";

const storageBehaviorExtraData: SaveStructureDef<
  StorageBehavior["extraData"]
> = {
  $uiPathName: "Stored Items",

  $editor: "game-object-list",
  $editorProps: {
    isFlatList: true
  },

  "*": {
    $editor: "game-object-default",
    $uiPathName(obj: StoredGameObject, path: string[]) {
      const index = path[path.length - 1];
      return `${index}: ${obj.name}`;
    },
    $variants: []
  }
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
