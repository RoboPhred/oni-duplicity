import {
  SaveGame,
  GameObject,
  BehaviorName,
  GameObjectBehavior,
  GameObjectGroup,
  getBehavior,
} from "oni-save-parser";
import { findIndex } from "lodash";

import { getGameObjectId } from "../utils";
import { OniSaveState } from "../state";

export class ModifySaveError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function tryModifySaveGame(
  state: OniSaveState,
  modifier: (saveGame: SaveGame) => SaveGame
): OniSaveState {
  let { saveGame } = state;
  if (saveGame) {
    try {
      saveGame = modifier(saveGame);
      state = {
        ...state,
        saveGame,
        isModified: true,
      };
    } catch (e: any) {
      if (!(e instanceof ModifySaveError)) {
        throw e;
      }
    }
  }
  return state;
}

export function addGameObject(
  saveGame: SaveGame,
  gameObjectType: string,
  gameObject: GameObject
): SaveGame {
  let groupIndex = findIndex(
    saveGame.gameObjects,
    (x) => x.name === gameObjectType
  );
  if (groupIndex === -1) {
    const group: GameObjectGroup = {
      name: gameObjectType,
      gameObjects: [gameObject],
    };
    return {
      ...saveGame,
      gameObjects: [...saveGame.gameObjects, group],
    };
  }

  const gameObjects = [...saveGame.gameObjects];
  gameObjects[groupIndex] = {
    ...gameObjects[groupIndex],
    gameObjects: [...gameObjects[groupIndex].gameObjects, gameObject],
  };

  return {
    ...saveGame,
    gameObjects,
  };
}

export function removeGameObject(
  saveGame: SaveGame,
  gameObjectId: number
): SaveGame {
  const [groupIndex, gameObjectIndex] = getGameObjectLocationById(
    saveGame,
    gameObjectId
  );

  // We need to use basic spread here instead of merge(), as merge treats
  //  empty array the same as empty object and will use the source value.
  // We want to directly set an empty array if we remove the last object.
  let newSaveGame = {
    ...saveGame,
    gameObjects: replace(saveGame.gameObjects, groupIndex, {
      ...saveGame.gameObjects[groupIndex],
      gameObjects: drop(
        saveGame.gameObjects[groupIndex].gameObjects,
        gameObjectIndex
      ),
    }),
  };

  return newSaveGame;
}

export function requireGameObject(
  saveGame: SaveGame,
  gameObjectId: number,
  gameObjectType?: string
): GameObject {
  const [groupIndex, gameObjectIndex] = getGameObjectLocationById(
    saveGame,
    gameObjectId
  );
  if (
    gameObjectType &&
    saveGame.gameObjects[groupIndex].name !== gameObjectType
  ) {
    throw new ModifySaveError(
      `Expected GameObject ${gameObjectId} to be type ${gameObjectType}.`
    );
  }
  return saveGame.gameObjects[groupIndex].gameObjects[gameObjectIndex];
}

export function requireBehavior<T extends GameObjectBehavior>(
  gameObject: GameObject,
  behaviorName: BehaviorName<T>
): T {
  const behavior = getBehavior(gameObject, behaviorName);
  if (!behavior) {
    throw new ModifySaveError(
      `Expected GameObject to have behavior ${behaviorName}.`
    );
  }
  return behavior;
}

export function replaceGameObject(
  saveGame: SaveGame,
  gameObject: GameObject
): SaveGame {
  const gameObjectId = getGameObjectId(gameObject);
  if (!gameObjectId) {
    throw new ModifySaveError(`GameObject ${gameObjectId} has no id.`);
  }

  const [groupIndex, gameObjectIndex] = getGameObjectLocationById(
    saveGame,
    gameObjectId
  );

  let newSaveGame = {
    ...saveGame,
    gameObjects: replace(saveGame.gameObjects, groupIndex, {
      ...saveGame.gameObjects[groupIndex],
      gameObjects: replace(
        saveGame.gameObjects[groupIndex].gameObjects,
        gameObjectIndex,
        gameObject
      ),
    }),
  };

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
): GameObject {
  const behaviorIndex = findIndex(
    gameObject.behaviors,
    (x) => x.name === behaviorName
  );
  if (behaviorIndex === -1) {
    throw new ModifySaveError(
      `GameObject does not have behavior "${behaviorName}".`
    );
  }

  const behavior = gameObject.behaviors[behaviorIndex];
  const newData = applyModifier(behavior[dataKey], modifier);

  return {
    ...gameObject,
    behaviors: replace(gameObject.behaviors, behaviorIndex, {
      ...gameObject.behaviors[behaviorIndex],
      [dataKey]: newData,
    }),
  };
}

export function set(obj: any, path: string[], value: any): any {
  if (path.length === 0) {
    return value;
  }

  obj = { ...obj };
  let target = obj;
  for (const key of path.slice(0, -1)) {
    const prop = { ...target[key] };
    target[key] = prop;
    target = prop;
  }
  target[path[path.length - 1]] = value;

  return obj;
}

export function setArrayDict<TKey, TValue>(
  arrayDict: [TKey, TValue][],
  key: TKey,
  value: TValue
): [TKey, TValue][] {
  const index = findIndex(arrayDict, (x) => x[0] === key);
  if (index === -1) {
    throw new Error("Key not found.");
  }

  return replace<[TKey, TValue]>(arrayDict, index, [key, value]);
}

function applyModifier<T>(data: T, modifier: DataModifier<T>): T {
  let newData: T;
  if (typeof modifier === "function") {
    newData = modifier(data);
  } else {
    newData = {
      ...data,
      ...modifier,
    };
  }
  return newData;
}

function getGameObjectLocationById(
  saveGame: SaveGame,
  gameObjectId: number
): [number, number] {
  const { gameObjects: gameObjectGroups } = saveGame;
  let gameObjectIndex = -1;
  for (let groupIndex = 0; groupIndex < gameObjectGroups.length; groupIndex++) {
    const group = gameObjectGroups[groupIndex];
    gameObjectIndex = getGameObjectIndexById(group, gameObjectId);
    if (gameObjectIndex !== -1) {
      return [groupIndex, gameObjectIndex];
    }
  }

  throw new ModifySaveError(
    `GameObject ${gameObjectId} does not exist in the save.`
  );
}

function getGameObjectIndexById(group: GameObjectGroup, gameObjectId: number) {
  const { gameObjects } = group;
  for (
    let gameObjectIndex = 0;
    gameObjectIndex < gameObjects.length;
    gameObjectIndex++
  ) {
    const gameObject = gameObjects[gameObjectIndex];
    if (getGameObjectId(gameObject) === gameObjectId) {
      return gameObjectIndex;
    }
  }

  return -1;
}

function drop<T>(array: T[], index: number): T[] {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

function replace<T>(array: T[], index: number, value: T): T[] {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}
