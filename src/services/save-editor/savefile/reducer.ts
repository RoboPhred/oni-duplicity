
import { AnyAction } from "redux";
import uuidV4 from "uuid/v4";

import { SaveEditorState, defaultSaveEditorState, NormalizedID } from "../state";

import {
    SavefileActions,
    ACTION_SAVEFILE_LOAD,
    ACTION_SAVEFILE_RECEIVED,
    ACTION_SAVEFILE_SAVE_START,
    ACTION_SAVEFILE_SAVE_END
} from "./actions";

import { getBehavior, KPrefabIDBehavior } from "./../behaviors";
import { warning, error, FAILURE_TYPE } from "../../../logging";


export default function saveFileReducer(state: SaveEditorState = defaultSaveEditorState, _action: AnyAction): SaveEditorState {
    const action = _action as SavefileActions;
    switch (action.type) {
        case ACTION_SAVEFILE_LOAD: {
            const {
                file
            } = action.payload;

            // Also ignored in saga.
            if (state.isSaving) return state;

            return {
                ...defaultSaveEditorState,
                fileName: file.name,
                isLoading: true
            }
        }
        case ACTION_SAVEFILE_RECEIVED: {
            const {
                saveGame
            } = action.payload;

            // Build a normalization cache of game object PrefabIDs to the
            //  type and array index of the object.
            // We can save a lot of work by precaching this information,
            //  and we (currently) do not create / delete / reorder any objects.
            const normalizedIDs: NormalizedID[] = [];
            for (let prefabType in saveGame.body.gameObjects) {
                const prefabs = saveGame.body.gameObjects[prefabType];
                for (let i = 0; i < prefabs.length; i++) {
                    const idBehavior = getBehavior(prefabs[i], KPrefabIDBehavior);
                    if (!idBehavior) {
                        warning(`GameObject at "${prefabs}":${i} has no behavior "${KPrefabIDBehavior}".`, FAILURE_TYPE.MISSING_BEHAVIOR);
                        continue;
                    }
                    if (!idBehavior.parsedData || isNaN(idBehavior.parsedData.InstanceID)) {
                        error(`GameObject at "${prefabType}":${i} has invalid data in behavior "${KPrefabIDBehavior}".`, FAILURE_TYPE.SAVEFILE_CORRUPT);
                        continue;
                    }

                    normalizedIDs[idBehavior.parsedData.InstanceID] = {
                        type: prefabType,
                        index: i
                    };
                }
            }

            return {
                ...state,
                isLoading: false,
                saveGame: action.payload.saveGame,
                normalizedIDs
            };
        }
        case ACTION_SAVEFILE_SAVE_START:
            return {
                ...state,
                isSaving: true
            }
        case ACTION_SAVEFILE_SAVE_END:
            return {
                ...state,
                isSaving: false
            }
        default:
            return state;
    }
}
