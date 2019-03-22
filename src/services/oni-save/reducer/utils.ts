import {
  SaveGame,
  GameObject,
  BehaviorName,
  GameObjectBehavior,
  GameObjectGroup
} from "oni-save-parser";
import { findIndex, merge } from "lodash-es";

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

export type DataModifier<T> = Partial<T> | ((data: T) => T);
export function changeStateBehaviorData<
  T extends GameObjectBehavior,
  K extends "templateData" | "extraData"
>(
  gameObject: GameObject,
  behaviorName: BehaviorName<T>,
  dataKey: K,
  modifier: DataModifier<T[K]>
): GameObject | null {
  const behaviorIndex = findIndex(
    gameObject.behaviors,
    x => x.name === behaviorName
  );
  if (behaviorIndex === -1) {
    return null;
  }

  const behavior = gameObject.behaviors[behaviorIndex];
  const newData = applyModifier(behavior[dataKey], modifier);

  return merge({}, gameObject, {
    behaviors: {
      [behaviorIndex]: {
        templateData: newData
      }
    }
  });
}

function applyModifier<T>(data: T, modifier: DataModifier<T>): T {
  let newData: T;
  if (typeof modifier === "function") {
    newData = modifier(data);
  } else {
    newData = {
      ...data,
      ...modifier
    };
  }
  return newData;
}
