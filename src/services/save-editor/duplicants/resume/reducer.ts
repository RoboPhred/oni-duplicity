import { AnyAction } from "redux";

import { SaveEditorState, defaultSaveEditorState } from "../../state";

import { modifyBehavior } from "../../reducer-utils";

import {
    ACTION_DUPLICANT_ROLE_MASTERY_SET,
    ACTION_DUPLICANT_ROLE_EXPERIENCE_SET,
    DuplicantResumeActions,
    ACTION_DUPLICANT_ROLE_TARGET_SET,
    ACTION_DUPLICANT_ROLE_CURRENT_SET
} from "./actions";
import { MinionResumeBehavior } from "../../behaviors";


export default function duplicantAccessoriesReducer(state: SaveEditorState = defaultSaveEditorState, _action: AnyAction): SaveEditorState {
    const action = _action as DuplicantResumeActions;
    switch(action.type) {
        case ACTION_DUPLICANT_ROLE_CURRENT_SET: {
            const {
                duplicantID,
                roleID,
            } = action.payload;

            return modifyBehavior(
                state,
                action,
                duplicantID,
                MinionResumeBehavior,
                behavior => ({
                    ...behavior,
                    parsedData: {
                        ...behavior.parsedData,
                        currentRole: roleID
                    }
                })
            );
        }
        case ACTION_DUPLICANT_ROLE_TARGET_SET: {
            const {
                duplicantID,
                roleID,
            } = action.payload;

            return modifyBehavior(
                state,
                action,
                duplicantID,
                MinionResumeBehavior,
                behavior => ({
                    ...behavior,
                    parsedData: {
                        ...behavior.parsedData,
                        targetRole: roleID
                    }
                })
            );
        }
        case ACTION_DUPLICANT_ROLE_MASTERY_SET: {
            const {
                duplicantID,
                roleID,
                mastery
            } = action.payload;

            return modifyBehavior(
                state,
                action,
                duplicantID,
                MinionResumeBehavior,
                behavior => ({
                    ...behavior,
                    parsedData: {
                        ...behavior.parsedData,
                        MasteryByRoleID: new Map<string, boolean>(Array.from(behavior.parsedData.MasteryByRoleID.entries()).concat([[roleID, mastery]]))
                    }
                })
            );
        }
        case ACTION_DUPLICANT_ROLE_EXPERIENCE_SET: {
            const {
                duplicantID,
                roleID,
                experience
            } = action.payload;

            return modifyBehavior(
                state,
                action,
                duplicantID,
                MinionResumeBehavior,
                behavior => ({
                    ...behavior,
                    parsedData: {
                        ...behavior.parsedData,
                        ExperienceByRoleID: new Map<string, number>(Array.from(behavior.parsedData.ExperienceByRoleID.entries()).concat([[roleID, experience]]))
                    }
                })
            );
        }
        default:
            return state;
    }
}