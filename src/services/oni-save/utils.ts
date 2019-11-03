import {
  SaveGame,
  getBehavior,
  KPrefabIDBehavior,
  GameObject
} from "oni-save-parser";

export function getGameObjectById(
  saveGame: SaveGame,
  gameObjectId: number
): GameObject | null {
  for (const group of saveGame.gameObjects) {
    for (const gameObject of group.gameObjects) {
      const id = getGameObjectId(gameObject);
      if (id === gameObjectId) {
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
