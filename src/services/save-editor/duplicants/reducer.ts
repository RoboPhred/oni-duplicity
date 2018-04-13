
import { AnyAction } from "redux";
import { GameObjectBehavior } from "oni-save-parser";

import { error, FAILURE_TYPE } from "../../../logging";

import { SaveEditorState, defaultSaveEditorState } from "../state";

import {
    MinionIdentityBehavior,
    AIAttributeLevelsBehavior,
    BehaviorName,
    AITraitsBehavior
} from "../behaviors";

import {
    ACTION_DUPLICANT_RENAME,
    ACTION_DUPLICANT_SKILL_SET_LEVEL,
    ACTION_DUPLICANT_SKILL_SET_EXPERIENCE,
    ACTION_DUPLICANT_TRAITS_SET,
    DuplicantActions
} from "./actions";
import { Behavior } from "popper.js";


export default function duplicantsReducer(state: SaveEditorState = defaultSaveEditorState, _action: AnyAction) {
    const action = _action as DuplicantActions;
    switch(action.type) {
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
                (behavior, gameObjectIndex) => {
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
                (behavior, gameObjectIndex) => {
                    const levels = behavior.parsedData.saveLoadLevels;

                    const skillIndex = levels.findIndex(x => x.attributeId === skillId);
                    if (skillIndex === -1) {
                        error(`Action "${action.type}" prefabID ${duplicantID} prefab "Minion":${gameObjectIndex} behavior "${AIAttributeLevelsBehavior}" does not have skill ID ${skillId}.`, FAILURE_TYPE.SAVEFILE_CORRUPT);
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
                (behavior, gameObjectIndex) => {
                    const levels = behavior.parsedData.saveLoadLevels;

                    const skillIndex = levels.findIndex(x => x.attributeId === skillId);
                    if (skillIndex === -1) {
                        error(`Action "${action.type}" prefabID ${duplicantID} prefab "Minion":${gameObjectIndex} behavior "${AIAttributeLevelsBehavior}" does not have skill ID ${skillId}.`, FAILURE_TYPE.SAVEFILE_CORRUPT);
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
        default:
            return state;
    }
}

function modifyBehavior<T extends GameObjectBehavior>(
    state: SaveEditorState,
    action: AnyAction,
    prefabID: number,
    behaviorName: BehaviorName<T>,
    modifier: (behavior: T, gameObjectIndex: number) => T
): SaveEditorState {
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

    const behaviorIndex = gameObject.behaviors.findIndex(x => x.name === behaviorName);
    if (behaviorIndex === -1) {
        error(`Action "${action.type}" prefabID ${prefabID} prefab "${type}":${index} does not have behavior "${behaviorName}".`, FAILURE_TYPE.SAVEFILE_CORRUPT);
        return state;
    }
    const behavior = gameObject.behaviors[behaviorIndex] as T;

    const newBehavior = modifier(behavior, index);

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
                        {
                            ...gameObject,
                            behaviors: [
                                ...gameObject.behaviors.slice(0, behaviorIndex),
                                newBehavior,
                                ...gameObject.behaviors.slice(behaviorIndex + 1)

                            ]
                        },
                        ...saveGame.body.gameObjects[type].slice(index + 1)
                    ]
                }
            }
        }
    }
}
