import {
  GameObjectGroup,
  GameObject,
  getBehavior,
  StorageBehavior,
  PrimaryElementBehavior,
  SimHashName
} from "oni-save-parser";
import { createSelector } from "reselect";
import { values, orderBy, flatMap } from "lodash";

import { MaterialObjectName, MaterialGameObjectNames } from "../materials";
import { gameObjectGroupsSelector } from "./game-objects";

export interface MaterialListItem {
  name: MaterialObjectName;
  looseGrams: number;
  looseCount: number;
  storedGrams: number;
  storedCount: number;
}

export const materialsSelector = createSelector(
  gameObjectGroupsSelector,
  groups => {
    const rowsByMaterial: Record<string, MaterialListItem> = {};

    if (groups) {
      for (const group of groups) {
        countMaterialGroup(group, rowsByMaterial);
      }
    }

    const rows = values(rowsByMaterial);
    return orderBy(rows, ["name"]);
  }
);

function countMaterialGroup(
  group: GameObjectGroup,
  rowsByMaterial: Record<string, MaterialListItem>
) {
  const loose = isMaterialGameObject(group.name);
  if (loose) {
    countLooseMaterialGroup(group, rowsByMaterial);
  } else {
    countStorageGroup(group, rowsByMaterial);
  }
}

function countLooseMaterialGroup(
  group: GameObjectGroup,
  rowsByMaterial: Record<string, MaterialListItem>
) {
  for (const gameObject of group.gameObjects) {
    addMaterialObject(
      group.name as SimHashName,
      gameObject,
      true,
      rowsByMaterial
    );
  }
}

function countStorageGroup(
  group: GameObjectGroup,
  rowsByMaterial: Record<string, MaterialListItem>
) {
  const storedObjects = flatMap(group.gameObjects, getStoredObjects);
  for (const storedObject of storedObjects) {
    const { type, gameObject } = storedObject;

    if (!isMaterialGameObject(type)) {
      continue;
    }

    addMaterialObject(type, gameObject, false, rowsByMaterial);
  }
}

function getStoredObjects(
  gameObject: GameObject
): { type: string; gameObject: GameObject }[] {
  const storage = getBehavior(gameObject, StorageBehavior);
  if (!storage) {
    return [];
  }

  return storage.extraData.map(({ name, ...gameObject }) => ({
    type: name,
    gameObject
  }));
}

function getMaterialRow(
  name: MaterialObjectName,
  rowsByMaterial: Record<string, MaterialListItem>
) {
  if (!rowsByMaterial[name]) {
    rowsByMaterial[name] = {
      name,
      looseCount: 0,
      looseGrams: 0,
      storedCount: 0,
      storedGrams: 0
    };
  }
  return rowsByMaterial[name];
}

// This should return `type is SimHashName`, but typescript wont let me
//  make that assurance.
function isMaterialGameObject(type: string): type is MaterialObjectName {
  return MaterialGameObjectNames.indexOf(type as any) !== -1;
}

function addMaterialObject(
  name: MaterialObjectName,
  gameObject: GameObject,
  loose: boolean,
  rowsByMaterial: Record<string, MaterialListItem>
) {
  const elementBehavior = getBehavior(gameObject, PrimaryElementBehavior);
  if (!elementBehavior) {
    return;
  }

  const { Units } = elementBehavior.templateData;

  // Use custom provided name, as many objects (food, clothing) have the same primary element.
  const row = getMaterialRow(name, rowsByMaterial);

  if (loose) {
    row.looseCount++;
    row.looseGrams += Units;
  } else {
    row.storedCount++;
    row.storedGrams += Units;
  }
}
