import {
  SaveGame,
  GameObject,
  getBehavior,
  MinionIdentityBehavior
} from "oni-save-parser";

import { isObject } from "lodash-es";

// TODO: Fix typings.
//  We need to define an object that has the keys of
//  SaveStructureItemCore explicitly, and have
//  any unspecified key be of our own type (recursive)
// I am certain I had this working on an older project,
//  but the type-join & operator seems to now be merging the Core
//  props into the indexer rather than checking both types seperately.
export type SaveStructureItemCore = {
  $match?(obj: any): boolean;
  $title?(obj: any): string;
  $select?: string[];
  $variants?: SaveStructureItem[];
};
export interface SaveStructureItemKeys {
  [key: string]: SaveStructureItem | undefined;
}
export type SaveStructureItem = SaveStructureItemKeys & SaveStructureItemCore;

// A Minion gameObject group
// TODO: Fix typings.
//  I have been able to define a type with a specific indexer
//  plus additional non-index-matching props before, but can't
//  figure it out right now.
const minionGameObject: any /*SaveStructureItem*/ = {
  // Only apply this rule to minion game object groups.
  $match: gameObjectIs("Minion"),

  $select: ["gameObjects"],

  // gameObjects in a gameObject group is an array of GameObject
  gameObjects: {
    "*": {
      $title: (obj: GameObject) => {
        const identityBehavior = getBehavior(obj, MinionIdentityBehavior);
        const name =
          (identityBehavior &&
            identityBehavior.templateData &&
            identityBehavior.templateData.name) ||
          "[malformed]";
        return `${name} (Duplicant)`;
      }
    }
  }
};

const gameObjectGroupsStructure: any /*SaveStructureItem*/ = {
  // We want to handle each game object type uniquely,
  //  but their uniqueness is keyed off the name of this group.
  // To handle this, we provide variants that match off the group's name.
  $variants: [minionGameObject]
};

const saveStructure: any /*SaveStructureItem*/ = {
  // Describe the structure under "gameObjects"
  //  This field is an array of {name: string, gameObjects: GameObject[]}
  gameObjects: {
    // gameObjects is an array, so we use the fallback key to
    //  handle all items.
    "*": gameObjectGroupsStructure
  }
};

function gameObjectIs(type: string): (obj: any) => boolean {
  return obj => isObject(obj) && obj.name === type;
}

export function getSaveStructureItem(
  path: string[],
  save: SaveGame
): SaveStructureItem | null {
  let structure: SaveStructureItem = saveStructure;
  let value: any = save;
  for (let key of path) {
    let subStructure: SaveStructureItem | undefined;
    if (isObject(structure)) {
      subStructure =
        Object.keys(structure).indexOf(key) !== -1
          ? structure[key]
          : structure["*"];
    }

    if (!subStructure) {
      return null;
    }

    // Pick the value before searching for variants.
    value = value[key];

    // Try to pick a variant if possible.
    if (subStructure.$variants) {
      const variant = subStructure.$variants.find(
        x => (x.$match && x.$match(value)) || false
      );
      if (variant) {
        subStructure = {
          ...subStructure,
          ...variant
        };
      }
    }

    structure = subStructure;
  }

  return structure;
}
