import {
  SaveGame,
  getBehavior,
  KPrefabIDBehavior,
  GameObject
} from "oni-save-parser";

// We cannot use a selector for this, as it is called with draft objects from immer.
export function getGameObjectById(
  saveGame: SaveGame,
  gameObjectId: number
): GameObject | null {
  for (const group of saveGame.gameObjects) {
    for (const gameObject of group.gameObjects) {
      const idBehavior = getBehavior(gameObject, KPrefabIDBehavior);
      if (!idBehavior) {
        continue;
      }
      if (idBehavior.templateData.InstanceID === gameObjectId) {
        return gameObject;
      }
    }
  }
  return null;
}

export function getGameObjectId(gameObject: GameObject): number | null {
  const idBehavior = getBehavior(gameObject, KPrefabIDBehavior);
  if (!idBehavior) {
    return null;
  }

  return idBehavior.templateData.InstanceID;
}
