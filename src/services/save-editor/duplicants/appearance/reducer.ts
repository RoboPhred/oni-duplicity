
import { AnyAction } from "redux";

import { SaveEditorState, defaultSaveEditorState } from "../../state";

import { modifyBehavior } from "../../reducer-utils";

import {
    AccessorizerBehavior,
    Accessory,
    getIndexOfAccessoryType,
    getAccessoryOrdinal,
    makeAccessoryID
} from "oni-save-parser";

import {
    ACTION_DUPLICANT_APPEARANCE_EYES_SET,
    ACTION_DUPLICANT_APPEARANCE_HAIR_SET,
    ACTION_DUPLICANT_APPEARANCE_HEAD_SET,
    ACTION_DUPLICANT_APPEARANCE_MOUTH_SET,
    ACTION_DUPLICANT_APPEARANCE_BODY_SET,
    DuplicantAppearanceActions
} from "./actions";


export default function duplicantAccessoriesReducer(state: SaveEditorState = defaultSaveEditorState, _action: AnyAction): SaveEditorState {
    const action = _action as DuplicantAppearanceActions;
    switch(action.type) {
        case ACTION_DUPLICANT_APPEARANCE_EYES_SET: {
            const {
                duplicantID,
                accessoryID
            } = action.payload;

            return modifyAccessory(
                state,
                action,
                duplicantID,
                "eyes",
                accessoryID
            );
        }
        case ACTION_DUPLICANT_APPEARANCE_HAIR_SET: {
            const {
                duplicantID,
                accessoryID
            } = action.payload;

            state = modifyAccessory(
                state,
                action,
                duplicantID,
                "hair",
                accessoryID
            );

            const ordinal = getAccessoryOrdinal(accessoryID);
            state = modifyAccessory(
                state,
                action,
                duplicantID,
                "hat_hair",
                makeAccessoryID("hat_hair", ordinal || 1)
            );

            // TODO: Also hair_always?  Seems that way from MinionStartingStates CreateBodyData,
            //  but saved dups have a DEFAULT here

            return state;
        }
        case ACTION_DUPLICANT_APPEARANCE_HEAD_SET: {
            const {
                duplicantID,
                accessoryID
            } = action.payload;

            return modifyAccessory(
                state,
                action,
                duplicantID,
                "headshape",
                accessoryID
            );
        }
        case ACTION_DUPLICANT_APPEARANCE_MOUTH_SET: {
            const {
                duplicantID,
                accessoryID
            } = action.payload;

            return modifyAccessory(
                state,
                action,
                duplicantID,
                "mouth",
                accessoryID
            );
        }
        case ACTION_DUPLICANT_APPEARANCE_BODY_SET: {
            const {
                duplicantID,
                accessoryID
            } = action.payload;

            state = modifyAccessory(
                state,
                action,
                duplicantID,
                "body",
                accessoryID
            );

            const ordinal = getAccessoryOrdinal(accessoryID);
            state = modifyAccessory(
                state,
                action,
                duplicantID,
                "arm",
                makeAccessoryID("arm", ordinal || 1)
            );

            return state;
        }
        default:
            return state;
    }
}

function modifyAccessory(
    state: SaveEditorState,
    action: AnyAction,
    duplicantID: number,
    accessoryType: string,
    accessoryID: string
): SaveEditorState {
    return modifyBehavior(
        state,
        action,
        duplicantID,
        AccessorizerBehavior,
        behavior => {
            const oldAccessories = behavior.parsedData!.accessories;
            const accIndex = getIndexOfAccessoryType(oldAccessories, accessoryType);
            const newAccessory: Accessory = {
                guid: {
                    Guid: accessoryID
                }
            };
            let accessories: Accessory[];
            if (accIndex !== -1) {
                accessories = [
                    ...oldAccessories.slice(0, accIndex),
                    newAccessory,
                    ...oldAccessories.slice(accIndex + 1)
                ];
            }
            else {
                accessories = [
                    ...oldAccessories,
                    newAccessory
                ];
            }

            return {
                ...behavior,
                parsedData: {
                    ...behavior.parsedData,
                    accessories
                }
            };
        }
    );
}