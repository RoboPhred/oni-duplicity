import { SimHashNames, GameObjectGroup, GameObject, getBehavior, StorageBehavior, PrimaryElementBehavior } from "oni-save-parser";
import { createSelector } from "reselect";
import { values, orderBy, flatMap } from "lodash-es";

import { gameObjectGroupsSelector } from "./game-objects";

// TODO: Seeds, clothing, other sweepables
const MaterialGameObjectTypes = [...SimHashNames];

export interface MaterialListItem {
  name: string;
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
    addMaterialObject(group.name, gameObject, true, rowsByMaterial);
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
  name: string,
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

function isMaterialGameObject(type: string): boolean {
  return MaterialGameObjectTypes.indexOf(type) !== -1;
}

function addMaterialObject(
  name: string,
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