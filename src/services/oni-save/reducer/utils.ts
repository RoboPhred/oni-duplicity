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

  const behavior = gameObject.behaviors[behaviorIndex];

  let newTemplateData: any;
  if (typeof templateData === "function") {
    newTemplateData = templateData(behavior.templateData);
  } else {
    newTemplateData = {
      ...behavior.templateData,
      ...templateData
    };
  }

  return merge({}, gameObject, {
    behaviors: {
      [behaviorIndex]: {
        templateData: newTemplateData
      }
    }
  });
}
