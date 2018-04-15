
import { createAction } from "../../../../action-utils";


export const ACTION_DUPLICANT_ROLE_CURRENT_SET = "@save-editor/duplicants/role/current/set";
export const setDuplicantCurrentRole = createAction(ACTION_DUPLICANT_ROLE_CURRENT_SET, (x: { duplicantID: number, roleID: string }) => x);
export type SetDuplicantCurrentRoleAction = ReturnType<typeof setDuplicantCurrentRole>;

export const ACTION_DUPLICANT_ROLE_TARGET_SET = "@save-editor/duplicants/role/target/set";
export const setDuplicantTargetRole = createAction(ACTION_DUPLICANT_ROLE_TARGET_SET, (x: { duplicantID: number, roleID: string }) => x);
export type SetDuplicantTargetRoleAction = ReturnType<typeof setDuplicantTargetRole>;

export const ACTION_DUPLICANT_ROLE_MASTERY_SET = "@save-editor/duplicants/role/mastery/set";
export const setDuplicantRoleMastery = createAction(ACTION_DUPLICANT_ROLE_MASTERY_SET, (x: { duplicantID: number, roleID: string, mastery: boolean }) => x);
export type SetDuplicantRoleMasteryAction = ReturnType<typeof setDuplicantRoleMastery>;

export const ACTION_DUPLICANT_ROLE_EXPERIENCE_SET = "@save-editor/duplicants/role/experience/set";
export const setDuplicantRoleExperience = createAction(ACTION_DUPLICANT_ROLE_EXPERIENCE_SET, (x: { duplicantID: number, roleID: string, experience: number }) => x);
export type SetDuplicantRoleExperienceAction = ReturnType<typeof setDuplicantRoleExperience>;


export type DuplicantResumeActions =
    SetDuplicantCurrentRoleAction
    | SetDuplicantTargetRoleAction
    | SetDuplicantRoleMasteryAction
    | SetDuplicantRoleExperienceAction;
