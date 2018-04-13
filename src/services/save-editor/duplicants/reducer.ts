
import { AnyAction } from "redux";
import { GameObjectBehavior, GameObject } from "oni-save-parser";

import { error, FAILURE_TYPE } from "../../../logging";

import { SaveEditorState, defaultSaveEditorState, NormalizedID } from "../state";

import {
    MinionIdentityBehavior,
    AIAttributeLevelsBehavior,
    BehaviorName,
    AITraitsBehavior,
    AIEffectsBehavior,
    HealthBehavior
} from "../behaviors";

import {
    ACTION_DUPLICANT_RENAME,
    ACTION_DUPLICANT_SKILL_SET_LEVEL,
    ACTION_DUPLICANT_SKILL_SET_EXPERIENCE,
    ACTION_DUPLICANT_TRAITS_SET,
    ACTION_DUPLICANT_EFFECTS_ADD,
    ACTION_DUPLICANT_EFFECTS_SETTIME,
    ACTION_DUPLICANT_EFFECTS_REMOVE,
    ACTION_DUPLICANT_HEALTH_STATE_SET,
    ACTION_DUPLICANT_SCALE_SET,
    DuplicantActions
} from "./actions";


export default function duplicantsReducer(state: SaveEditorState = defaultSaveEditorState, _action: AnyAction) {
    const action = _action as DuplicantActions;
    switch (action.type) {
        case ACTION_DUPLICANT_RENAME: {
            const {
                duplicantID,
                name
            } = action.payload;

            return modifyBehavior(
                state,
                action,
                duplicantID,
                MinionIdentityBehavior,
                (behavior) => {
                    const newBehavior: MinionIdentityBehavior = {
                        ...behavior,
                        parsedData: {
                            ...behavior.parsedData,
                            name
                        }
                    };
                    return newBehavior;
                }
            );
        }
        case ACTION_DUPLICANT_SKILL_SET_LEVEL: {
            const {
                duplicantID,
                skillId,
                level
            } = action.payload;

            return modifyBehavior(
                state,
                action,
                duplicantID,
                AIAttributeLevelsBehavior,
                (behavior, normalizedId) => {
                    const levels = behavior.parsedData.saveLoadLevels;

                    const skillIndex = levels.findIndex(x => x.attributeId === skillId);
                    if (skillIndex === -1) {
                        error(`Action "${action.type}" prefabID ${duplicantID} prefab "${normalizedId.type}":${normalizedId.index} behavior "${AIAttributeLevelsBehavior}" does not have skill ID ${skillId}.`, FAILURE_TYPE.ACTION_INVALID);
                        return behavior;
                    }

                    const newBehavior: AIAttributeLevelsBehavior = {
                        ...behavior,
                        parsedData: {
                            saveLoadLevels: [
                                ...levels.slice(0, skillIndex),
                                {
                                    ...levels[skillIndex],
                                    level: level
                                },
                                ...levels.slice(skillIndex + 1)
                            ]
                        }
                    }

                    return newBehavior;
                }
            );
        }
        case ACTION_DUPLICANT_SKILL_SET_EXPERIENCE: {
            const {
                duplicantID,
                skillId,
                experience
            } = action.payload;

            return modifyBehavior(
                state,
                action,
                duplicantID,
                AIAttributeLevelsBehavior,
                (behavior, normalizedId) => {
                    const levels = behavior.parsedData.saveLoadLevels;

                    const skillIndex = levels.findIndex(x => x.attributeId === skillId);
                    if (skillIndex === -1) {
                        error(`Action "${action.type}" prefabID ${duplicantID} prefab "${normalizedId.type}":${normalizedId.index} behavior "${AIAttributeLevelsBehavior}" does not have skill ID ${skillId}.`, FAILURE_TYPE.ACTION_INVALID);
                        return behavior;
                    }

                    const newBehavior: AIAttributeLevelsBehavior = {
                        ...behavior,
                        parsedData: {
                            saveLoadLevels: [
                                ...levels.slice(0, skillIndex),
                                {
                                    ...levels[skillIndex],
                                    experience
                                },
                                ...levels.slice(skillIndex + 1)
                            ]
                        }
                    }

                    return newBehavior;
                }
            );
        }
        case ACTION_DUPLICANT_TRAITS_SET: {
            const {
                duplicantID,
                traitIDs
            } = action.payload;

            return modifyBehavior(
                state,
                action,
                duplicantID,
                AITraitsBehavior,
                (behavior, gameObjectIndex) => {
                    const newBehavior: AITraitsBehavior = {
                        ...behavior,
                        parsedData: {
                            ...behavior.parsedData,
                            TraitIds: traitIDs
                        }
                    };
                    return newBehavior;
                }
            );
        }
        case ACTION_DUPLICANT_EFFECTS_ADD: {
            const {
                duplicantID,
                effectID,
                timeRemaining
            } = action.payload;

            return modifyBehavior(
                state,
                action,
                duplicantID,
                AIEffectsBehavior,
                (behavior, gameObjectIndex) => {
                    const effects = behavior.parsedData.saveLoadEffects;

                    const effectIndex = effects.findIndex(x => x.id === effectID);
                    if (effectIndex !== -1) {
                        return behavior;
                    }

                    const newBehavior: AIEffectsBehavior = {
                        ...behavior,
                        parsedData: {
                            saveLoadEffects: [
                                ...effects,
                                {
                                    id: effectID,
                                    timeRemaining
                                }
                            ]
                        }
                    }

                    return newBehavior;
                }
            );
        }
        case ACTION_DUPLICANT_EFFECTS_SETTIME: {
            const {
                duplicantID,
                effectID,
                timeRemaining
            } = action.payload;

            return modifyBehavior(
                state,
                action,
                duplicantID,
                AIEffectsBehavior,
                (behavior, normalizedId) => {
                    const effects = behavior.parsedData.saveLoadEffects;

                    const effectIndex = effects.findIndex(x => x.id === effectID);
                    if (effectIndex === -1) {
                        error(`Action "${action.type}" prefabID ${duplicantID} prefab "${normalizedId.type}":${normalizedId.index} behavior "${AIEffectsBehavior}" does not have effect ID ${effectID}.`, FAILURE_TYPE.ACTION_INVALID);
                        return behavior;
                    }

                    const newBehavior: AIEffectsBehavior = {
                        ...behavior,
                        parsedData: {
                            saveLoadEffects: [
                                ...effects.slice(0, effectIndex),
                                {
                                    ...effects[effectIndex],
                                    timeRemaining
                                },
                                ...effects.slice(effectIndex + 1)
                            ]
                        }
                    }

                    return newBehavior;
                }
            );
        }
        case ACTION_DUPLICANT_EFFECTS_REMOVE: {
            const {
                duplicantID,
                effectID
            } = action.payload;

            return modifyBehavior(
                state,
                action,
                duplicantID,
                AIEffectsBehavior,
                (behavior) => {
                    const effects = behavior.parsedData.saveLoadEffects;

                    const effectIndex = effects.findIndex(x => x.id === effectID);
                    if (effectIndex === -1) {
                        return behavior;
                    }

                    const newBehavior: AIEffectsBehavior = {
                        ...behavior,
                        parsedData: {
                            saveLoadEffects: [
                                ...effects.slice(0, effectIndex),
                                ...effects.slice(effectIndex + 1)
                            ]
                        }
                    }

                    return newBehavior;
                }
            );
        }
        case ACTION_DUPLICANT_HEALTH_STATE_SET: {
            const {
                duplicantID,
                healthState
            } = action.payload;

            return modifyBehavior(
                state,
                action,
                duplicantID,
                HealthBehavior,
                (behavior) => ({
                    ...behavior,
                    parsedData: {
                        ...behavior.parsedData,
                        State: healthState
                    }
                })
            );
        }
        case ACTION_DUPLICANT_SCALE_SET: {
            const {
                duplicantID,
                scaleX,
                scaleY
            } = action.payload;

            return modifyGameObject(
                state,
                action,
                duplicantID,
                (gameObject) => ({
                    ...gameObject,
                    scale: {
                        ...gameObject.scale,
                        x: scaleX || gameObject.scale.x,
                        y: scaleY || gameObject.scale.y
                    }
                })
            );
        }
        default:
            return state;
    }
}

function modifyGameObject(
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

function modifyBehavior<T extends GameObjectBehavior>(
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
