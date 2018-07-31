import { set, memoize } from "lodash-es";

import { gameObjectIs } from "../../matchers";
import { SaveStructureDef } from "../../types";

import { defaultGameObject } from "./default";

import { GameObjectTypeInfo } from "./types";

function createGameObjectVariants(
  gameObjectTypeInfos: GameObjectTypeInfo[],
  gameObjectPath: string[] | null
): SaveStructureDef<{}>[] {
  const defaultVariant: SaveStructureDef<{}> = {
    $advanced: true
  };
  setStructure(defaultVariant, gameObjectPath, defaultGameObject);

  const variants = gameObjectTypeInfos.map(info => {
    const rootVariant: SaveStructureDef<{}> = {
      $match: gameObjectIs(info.gameObjectName)
    };
    setStructure(rootVariant, gameObjectPath, info.gameObjectStructure);
    return rootVariant;
  });

  // Add default as last item
  variants.push(defaultVariant);
  return variants;
}

function setStructure(
  obj: any,
  path: string[] | null,
  structure: SaveStructureDef
) {
  if (path && path.length > 0) {
    // Collapse the intermediate paths.
    for (let i = 1; i < path.length; i++) {
      set(obj, [...path.slice(0, i), "$uiPathName"], false);
    }
    set(obj, path, structure);
  } else {
    // Use a one-value rootVariant to ensure we get a reference,
    //  to mantain recursive support.
    Object.assign(obj, structure);
  }
}

export const getGameObjectVariants = memoize(
  createGameObjectVariants,
  (
    gameObjectTypeInfos: GameObjectTypeInfo[],
    gameObjectPath: string[] | null
  ) => {
    const infoKey = gameObjectTypeInfos
      .map(x => x.gameObjectName)
      .sort()
      .join(":");
    const pathKey = gameObjectPath ? gameObjectPath.join(":") : "";
    return `${infoKey}::${pathKey}`;
  }
);
