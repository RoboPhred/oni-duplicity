import { SaveGame } from "../../../../node_modules/oni-save-parser";

export const ACTION_RECEIVE_ONISAVE_BEGIN =
  "@/pages/SaveEditor/onisave/receive:begin";
export const receiveOniSaveBegin = (reset: boolean) => ({
  type: ACTION_RECEIVE_ONISAVE_BEGIN as typeof ACTION_RECEIVE_ONISAVE_BEGIN,
  payload: { reset }
});
export type ReceiveOniSaveBeginAction = ReturnType<typeof receiveOniSaveBegin>;

export const ACTION_RECEIVE_ONISAVE_ERROR =
  "@/pages/SaveEditor/onisave/receive:error";
export const receiveOniSaveError = (error: Error) => ({
  type: ACTION_RECEIVE_ONISAVE_ERROR as typeof ACTION_RECEIVE_ONISAVE_ERROR,
  payload: error
});
export type ReceiveOniSaveErrorAction = ReturnType<typeof receiveOniSaveError>;

export const ACTION_RECEIVE_ONISAVE_SUCCESS =
  "@/pages/SaveEditor/onisave/receive:success";
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
