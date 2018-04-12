
const failureType = {
    ACTION_INVALID: "action-invalid" as "action-invalid",
    SAVEFILE_CORRUPT: "savefile-corrupt" as "savefile-corrupt",
    STATE_CORRUPT: "state-corrupt" as "state-corrupt",
    MISSING_BEHAVIOR: "missing-behavior" as "missing-behavior"
};
Object.freeze(failureType);
Object.seal(failureType);

export type FailureType = (typeof failureType)[keyof typeof failureType];
export const FAILURE_TYPE: Readonly<typeof failureType> = failureType;


export function warning(message: string, failureType?: FailureType) {
    // TODO: Log to user console.
    console.warn(`(${failureType}):`, message);
}

export function error(message: string, failureType?: FailureType) {
    // TODO: Log to user console.
    console.error(`(${failureType}):`, message);
}