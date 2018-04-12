
import { AnyAction } from "redux";

import { error, FAILURE_TYPE } from "../../../logging";

import { SaveEditorState, defaultSaveEditorState } from "../state";

import {
    ACTION_DUPLICANT_RENAME,
    DuplicantActions
} from "./actions";
import { MinionIdentityBehavior } from "../behaviors";

export default function duplicantsReducer(state: SaveEditorState = defaultSaveEditorState, _action: AnyAction) {
    const action = _action as DuplicantActions;
    switch(action.type) {
        case ACTION_DUPLICANT_RENAME: {
            const {
                prefabID,
                name
            } = action.payload;

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

            const identityIndex = gameObject.behaviors.findIndex(x => x.name === MinionIdentityBehavior);
            if (identityIndex === -1) {
                error(`Action "${action.type}" prefabID ${prefabID} prefab "${type}":${index} does not have behavior "${MinionIdentityBehavior}".`, FAILURE_TYPE.SAVEFILE_CORRUPT);
                return state;
            }
            const identity = gameObject.behaviors[identityIndex];

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
                                        ...gameObject.behaviors.slice(0, identityIndex),
                                        {
                                            ...identity,
                                            parsedData: {
                                                ...identity.parsedData,
                                                name
                                            }
                                        },
                                        ...gameObject.behaviors.slice(identityIndex + 1)

                                    ]
                                },
                                ...saveGame.body.gameObjects[type].slice(index + 1)
                            ]
                        }
                    }
                }
            }
        }
        default:
            return state;
    }
}