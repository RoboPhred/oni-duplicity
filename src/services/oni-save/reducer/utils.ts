import {
  SaveGame,
  GameObject,
  BehaviorName,
  GameObjectBehavior,
  GameObjectGroup
} from "oni-save-parser";
import { findIndex } from "lodash-es";
import { getGameObjectId } from "../utils";

export function addGameObject(
  saveGame: SaveGame,
  gameObjectType: string,
  gameObject: GameObject
): SaveGame {
  let groupIndex = findIndex(
    saveGame.gameObjects,
    x => x.name === gameObjectType
  );
  if (groupIndex === -1) {
    const group: GameObjectGroup = {
      name: gameObjectType,
      gameObjects: [gameObject]
    };
    return {
      ...saveGame,
      gameObjects: [...saveGame.gameObjects, group]
    };
  }

  const gameObjects = [...saveGame.gameObjects];
  gameObjects[groupIndex] = {
    ...gameObjects[groupIndex],
    gameObjects: [...gameObjects[groupIndex].gameObjects]
  };

  gameObjects[groupIndex].gameObjects.push(gameObject);

  return {
    ...saveGame,
    gameObjects
  };
}

export function removeGameObject(
  saveGame: SaveGame,
  gameObjectType: string,
  gameObjectId: number
): SaveGame {
  const groupIndex = findIndex(
    saveGame.gameObjects,
    x => x.name === gameObjectType
  );
  if (groupIndex === -1) {
    return saveGame;
  }

  const group = saveGame.gameObjects[groupIndex];
  const gameObjectIndex = findIndex(
    group.gameObjects,
    x => getGameObjectId(x) === gameObjectId
  );
  if (gameObjectIndex === -1) {
    return saveGame;
  }

  let newSaveGame = {
    ...saveGame,
    gameObjects: [...saveGame.gameObjects]
  };
  newSaveGame.gameObjects[groupIndex] = {
    ...saveGame.gameObjects[groupIndex],
    gameObjects: [...saveGame.gameObjects[groupIndex].gameObjects]
  };
  newSaveGame.gameObjects[groupIndex].gameObjects.splice(gameObjectIndex, 1);

  return newSaveGame;
}

export function changeBehaviorTemplateDataState<T extends GameObjectBehavior>(
  gameObject: GameObject,
  behaviorName: BehaviorName<T>,
  templateData:
    | Partial<T["templateData"]>
    | ((templateData: T["templateData"]) => T["templateData"])
): GameObject | null {
  const behaviorIndex = findIndex(
    gameObject.behaviors,
    x => x.name === behaviorName
  );
  if (behaviorIndex === -1) {
    return null;
  }

  // Duplicate game object and behaviors array
  const newGameObject = {
    ...gameObject,
    behaviors: [...gameObject.behaviors]
  };

  // Modify behaviors array with duplicated behavior, and apply the change.
  const oldBehavior = gameObject.behaviors[behaviorIndex];

  let resolvedTemplateData =
    typeof templateData === "function"
      ? templateData(oldBehavior.templateData)
      : templateData;

  newGameObject.behaviors[behaviorIndex] = {
    ...oldBehavior,
    templateData: {
      ...oldBehavior.templateData,
      ...resolvedTemplateData
    }
  };

  return newGameObject;
}
