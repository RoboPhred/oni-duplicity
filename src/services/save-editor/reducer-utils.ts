
import { SaveEditorState, NormalizedID } from "./state";
import { AnyAction } from "redux";
import { GameObject, GameObjectBehavior } from "oni-save-parser";
import { error, FAILURE_TYPE } from "../../logging";
import { BehaviorName } from "./behaviors";


export function modifyGameObject(
    state: SaveEditorState,
    action: AnyAction,
    prefabID: number,
    modifier: (gameObject: GameObject, normalizedId: NormalizedID) => GameObject
) {
    const saveGame = state.saveGame;
    if (!saveGame) {
        error(`Action "${action.type}" called before a save game is available.`, FAILURE_TYPE.ACTION_INVALID);
        return state;
    }

    const location = state.normalizedIDs[prefabID];
    if (!location) {
        error(`Action "${action.type}" requested prefabID ${prefabID}, which is not in the normalized ID table.`, FAILURE_TYPE.ACTION_INVALID);
        return state;
    }

    const {
        type,
        index
    } = location;

    if (type !== "Minion") {
        error(`Action "${action.type}" requested prefabID ${prefabID}, which is not a duplicant.`, FAILURE_TYPE.ACTION_INVALID);
        return state;
    }

    const gameObject = saveGame.body.gameObjects[type][index];
    if (!gameObject) {
        error(`Action "${action.type}" prefabID ${prefabID} mapped to prefab "${type}":${index}, which does not exist.`, FAILURE_TYPE.STATE_CORRUPT);
        return state;
    }

    const newGameObject = modifier(gameObject, location);

    // Aarrrgggh, normalize!
    return {
        ...state,
        saveGame: {
            ...saveGame,
            body: {
                ...saveGame.body,
                gameObjects: {
                    ...saveGame.body.gameObjects,
                    [type]: [
                        ...saveGame.body.gameObjects[type].slice(0, index),
                        newGameObject,
                        ...saveGame.body.gameObjects[type].slice(index + 1)
                    ]
                }
            }
        }
    }
}

export function modifyBehavior<T extends GameObjectBehavior>(
    state: SaveEditorState,
    action: AnyAction,
    prefabID: number,
    behaviorName: BehaviorName<T>,
    modifier: (behavior: T, normalizedId: NormalizedID) => T
): SaveEditorState {
    return modifyGameObject(
        state,
        action,
        prefabID,
        (gameObject, normalizedId) => {
            const behaviorIndex = gameObject.behaviors.findIndex(x => x.name === behaviorName);
            if (behaviorIndex === -1) {
                error(`Action "${action.type}" prefabID ${prefabID} prefab "${normalizedId.type}":${normalizedId.index} does not have behavior "${behaviorName}".`, FAILURE_TYPE.SAVEFILE_CORRUPT);
                return gameObject;
            }
            const behavior = gameObject.behaviors[behaviorIndex] as T;

            const newBehavior = modifier(behavior, normalizedId);

            const newGameObject: GameObject = {
                ...gameObject,
                behaviors: [
                    ...gameObject.behaviors.slice(0, behaviorIndex),
                    newBehavior,
                    ...gameObject.behaviors.slice(behaviorIndex + 1)

                ]
            }
            return newGameObject
        }
    );
}
