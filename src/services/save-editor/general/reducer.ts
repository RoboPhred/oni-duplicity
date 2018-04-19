
import { AnyAction } from "redux";
import { GameObjectBehavior, GameObject } from "oni-save-parser";

import { SaveEditorState, defaultSaveEditorState } from "../state";

import {
    ACTION_CYCLE_SET,
    ACTION_IMMIGRATION_TIMER_SET,
    ACTION_IMMIGRATION_READY_SET,
    GeneralActions
} from "./actions";


export default function generalReducer(state: SaveEditorState = defaultSaveEditorState, _action: AnyAction): SaveEditorState {
    const action = _action as GeneralActions;
    switch(action.type) {
        case ACTION_CYCLE_SET: {
            const {
                cycle
            } = action.payload;

            const saveGameRoot = state.saveGame;
            if (!saveGameRoot) return state;
            const saveGameObject = saveGameRoot.body.gameObjects["SaveGame"];
            if (!saveGameObject || saveGameObject.length !== 1) return state;
            const gameObject = saveGameObject[0];
            const behaviorIndex = gameObject.behaviors.findIndex(x => x.name === "GameClock");
            if (behaviorIndex === -1) return state;
            const behavior = gameObject.behaviors[behaviorIndex];

            const newBehavior: GameObjectBehavior = {
                ...behavior,
                parsedData: {
                    ...behavior.parsedData,
                    cycle
                }
            };

            const newGameObject: GameObject = {
                ...gameObject,
                behaviors: [
                    ...gameObject.behaviors.slice(0, behaviorIndex),
                    newBehavior,
                    ...gameObject.behaviors.slice(behaviorIndex + 1)
                ]
            };
        
            return {
                ...state,
                saveGame: {
                    ...saveGameRoot,
                    body: {
                        ...saveGameRoot.body,
                        gameObjects: {
                            ...saveGameRoot.body.gameObjects,
                            SaveGame: [
                                newGameObject
                            ]
                        }
                    }
                }
            };
        }
        case ACTION_IMMIGRATION_TIMER_SET: {
            const {
                time
            } = action.payload;

            const saveGameRoot = state.saveGame;
            if (!saveGameRoot) return state;
            const saveGameObject = saveGameRoot.body.gameObjects["SaveGame"];
            if (!saveGameObject || saveGameObject.length !== 1) return state;
            const gameObject = saveGameObject[0];
            const behaviorIndex = gameObject.behaviors.findIndex(x => x.name === "Immigration");
            if (behaviorIndex === -1) return state;
            const behavior = gameObject.behaviors[behaviorIndex];

            const newBehavior: GameObjectBehavior = {
                ...behavior,
                parsedData: {
                    ...behavior.parsedData,
                    timeBeforeSpawn: time
                }
            };

            const newGameObject: GameObject = {
                ...gameObject,
                behaviors: [
                    ...gameObject.behaviors.slice(0, behaviorIndex),
                    newBehavior,
                    ...gameObject.behaviors.slice(behaviorIndex + 1)
                ]
            };
        
            return {
                ...state,
                saveGame: {
                    ...saveGameRoot,
                    body: {
                        ...saveGameRoot.body,
                        gameObjects: {
                            ...saveGameRoot.body.gameObjects,
                            SaveGame: [
                                newGameObject
                            ]
                        }
                    }
                }
            };
        }
        case ACTION_IMMIGRATION_READY_SET: {
            const {
                ready
            } = action.payload;

            const saveGameRoot = state.saveGame;
            if (!saveGameRoot) return state;
            const saveGameObject = saveGameRoot.body.gameObjects["SaveGame"];
            if (!saveGameObject || saveGameObject.length !== 1) return state;
            const gameObject = saveGameObject[0];
            const behaviorIndex = gameObject.behaviors.findIndex(x => x.name === "Immigration");
            if (behaviorIndex === -1) return state;
            const behavior = gameObject.behaviors[behaviorIndex];

            const newBehavior: GameObjectBehavior = {
                ...behavior,
                parsedData: {
                    ...behavior.parsedData,
                    bImmigrantAvailable: ready
                }
            };

            const newGameObject: GameObject = {
                ...gameObject,
                behaviors: [
                    ...gameObject.behaviors.slice(0, behaviorIndex),
                    newBehavior,
                    ...gameObject.behaviors.slice(behaviorIndex + 1)
                ]
            };
        
            return {
                ...state,
                saveGame: {
                    ...saveGameRoot,
                    body: {
                        ...saveGameRoot.body,
                        gameObjects: {
                            ...saveGameRoot.body.gameObjects,
                            SaveGame: [
                                newGameObject
                            ]
                        }
                    }
                }
            };
        }
        default:
            return state;
    }
}
