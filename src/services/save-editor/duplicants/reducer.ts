
import { AnyAction } from "redux";
import {
    GameObjectBehavior,
    GameObject,
    MinionIdentityBehavior,
    AIAttributeLevelsBehavior,
    BehaviorName,
    AITraitsBehavior,
    AIEffectsBehavior,
    HealthBehavior,
    AccessorizerBehavior
} from "oni-save-parser";

import { error, FAILURE_TYPE, warning } from "../../../logging";

import { SaveEditorState, defaultSaveEditorState, NormalizedID } from "../state";

import { modifyGameObject, modifyBehavior } from "../reducer-utils";

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
    ACTION_DUPLICANT_GENDER_SET,
    ACTION_DUPLICANT_VOICE_SET,
    DuplicantActions
} from "./actions";

import duplicantAppearanceReducer from "./appearance/reducer";
import duplicantResumeReducer from "./resume/reducer";

export default function duplicantsReducer(state: SaveEditorState = defaultSaveEditorState, action: AnyAction): SaveEditorState {
    state = duplicantsRootReducer(state, action);
    state = duplicantAppearanceReducer(state, action);
    state = duplicantResumeReducer(state, action);
    return state;
}

function duplicantsRootReducer(state: SaveEditorState = defaultSaveEditorState, _action: AnyAction) {
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
                            name,
                            // Not sure about this.  This is used to select the duplicant biography flavor text.
                            //  If the value is null, it is set to NB
                            // nameStringKey: "NB"
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
        case ACTION_DUPLICANT_GENDER_SET: {
            const {
                duplicantID,
                gender
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
                            gender,
                            // Update the string key, so the UI shows the appropriate value.
                            genderStringKey: gender
                        }
                    };
                    return newBehavior;
                }
            );
        }
        case ACTION_DUPLICANT_VOICE_SET: {
            const {
                duplicantID,
                voiceIdx
            } = action.payload;

            // TODO: Export this range from oni-save-parser
            if (voiceIdx < 0 || voiceIdx > 4) {
                warning(`Action "${ACTION_DUPLICANT_VOICE_SET}" has invalid voice id ${voiceIdx}: must be between 0 and 4.`);
            }

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
                            voiceIdx
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
