import { set } from "lodash-es";

import { SaveStructureDef } from "../../types";

import { defaultGameObject } from "./default";

import { GameObjectTypeInfo } from "./types";

export function getGameObjectVariants(
  gameObjectTypeInfos: GameObjectTypeInfo[],
  gameObjectPath: string[] | null
): SaveStructureDef<{}>[] {
  const defaultVariant: SaveStructureDef<{}> = {
    $advanced: true
  };
  setStructure(defaultVariant, gameObjectPath, defaultGameObject);

  const variants = gameObjectTypeInfos.map(info => {
    const rootVariant: SaveStructureDef<{}> = {
      $match: info.gameObjectMatcher
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
