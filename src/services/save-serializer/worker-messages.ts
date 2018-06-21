import { SaveGame } from "oni-save-parser";

const COMMAND_PARSE_SAVE = "parse-save";
export const parseSave = (data: ArrayBuffer) => ({
  type: COMMAND_PARSE_SAVE as typeof COMMAND_PARSE_SAVE,
  data
});
export type ParseSaveCommand = ReturnType<typeof parseSave>;

const RESULT_SAVE_SUCCESS = "parse-save:success";
export const parseSaveSuccess = (saveGame: SaveGame) => ({
  type: RESULT_SAVE_SUCCESS as typeof RESULT_SAVE_SUCCESS,
  saveGame
});
export type ParseSaveSuccessResult = ReturnType<typeof parseSaveSuccess>;

const RESULT_SAVE_ERROR = "parse-save:error";
export const parseSaveError = (error: Error) => ({
  type: RESULT_SAVE_ERROR as typeof RESULT_SAVE_ERROR,
  error: errorToJson(error)
});
export type ParseSaveErrorResult = ReturnType<typeof parseSaveError>;

export type ParseSaveResult = ParseSaveSuccessResult | ParseSaveErrorResult;

const COMMAND_WRITE_SAVE = "write-save";
export const writeSave = (saveGame: SaveGame) => ({
  type: COMMAND_WRITE_SAVE as typeof COMMAND_WRITE_SAVE,
  saveGame
});
export type WriteSaveCommand = ReturnType<typeof writeSave>;

const RESULT_WRITE_SUCCESS = "write-save:success";
export const writeSaveSuccess = (data: ArrayBuffer) => ({
  type: RESULT_WRITE_SUCCESS as typeof RESULT_WRITE_SUCCESS,
  data
});
export type WriteSaveSuccessResult = ReturnType<typeof writeSaveSuccess>;

const RESULT_WRITE_ERROR = "write-save:error";
export const writeSaveError = (error: Error) => ({
  type: RESULT_WRITE_ERROR as typeof RESULT_WRITE_ERROR,
  error: errorToJson(error)
});
export type WriteSaveErrorResult = ReturnType<typeof writeSaveError>;

export type WriteSaveResult = WriteSaveSuccessResult | WriteSaveErrorResult;

export type SaveEditorCommand = ParseSaveCommand | WriteSaveCommand;
export type SaveEditorResult = ParseSaveResult | WriteSaveResult;

export interface SaveEditorCommandEvent extends MessageEvent {
  data: SaveEditorCommand;
}

export interface SaveEditorResultEvent extends MessageEvent {
  data: SaveEditorResult;
}

export interface ErrorJson {
  name: string;
  message: string;
  stack?: string;
}
export function errorToJson(e: Error): ErrorJson {
  return {
    name: e.name,
    message: e.message,
    stack: e.stack
  };
}
export function jsonToError(obj: ErrorJson): Error {
  const e = new Error(obj.message);
  e.name = obj.name;
  e.stack = obj.stack;
  return e;
}
