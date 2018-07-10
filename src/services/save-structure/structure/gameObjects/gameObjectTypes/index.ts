import { set } from "lodash-es";

import { gameObjectIs } from "../../matchers";
import { SaveStructureDef } from "../../types";

import * as minion from "./minion";

import { defaultGameObject } from "./default";

const gameObjectVariantInfo = [minion];

export function createGameObjectVariants(
  gameObjectPath: string[] | null
): SaveStructureDef<{}>[] {
  const defaultVariant: SaveStructureDef<{}> = {
    $advanced: true
  };
  setStructure(defaultVariant, gameObjectPath, defaultGameObject);

  const variants = gameObjectVariantInfo.map(info => {
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
    obj.$variants = [structure];
  }
}
