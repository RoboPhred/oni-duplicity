import { SaveGame } from "oni-save-parser";

export const ACTION_RECEIVE_ONISAVE_BEGIN = "oni-save/receive:begin";
export const receiveOniSaveBegin = (
  operation: "loading" | "saving",
  clearExisting?: boolean
) => ({
  type: ACTION_RECEIVE_ONISAVE_BEGIN as typeof ACTION_RECEIVE_ONISAVE_BEGIN,
  payload: { operation, clearExisting }
});
export type ReceiveOniSaveBeginAction = ReturnType<typeof receiveOniSaveBegin>;

export const ACTION_RECEIVE_ONISAVE_ERROR = "oni-save/receive:error";
export const receiveOniSaveError = (error: Error) => ({
  type: ACTION_RECEIVE_ONISAVE_ERROR as typeof ACTION_RECEIVE_ONISAVE_ERROR,
  payload: error
});
export type ReceiveOniSaveErrorAction = ReturnType<typeof receiveOniSaveError>;

export const ACTION_RECEIVE_ONISAVE_SUCCESS = "oni-save/receive:success";
export const receiveOniSaveSuccess = (oniSave: SaveGame) => ({
  type: ACTION_RECEIVE_ONISAVE_SUCCESS as typeof ACTION_RECEIVE_ONISAVE_SUCCESS,
  payload: oniSave
});
export type ReceiveOniSaveSuccessAction = ReturnType<
  typeof receiveOniSaveSuccess
>;

export type ReceiveOniSaveAction =
  | ReceiveOniSaveBeginAction
  | ReceiveOniSaveErrorAction
  | ReceiveOniSaveSuccessAction;
