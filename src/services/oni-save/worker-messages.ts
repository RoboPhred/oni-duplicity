import { SaveGame } from "oni-save-parser";

export const RESPONSE_PROGRESS = "progress";
export const sendProgress = (message: string) => ({
  type: RESPONSE_PROGRESS as typeof RESPONSE_PROGRESS,
  message,
});
export type ProgressResponse = ReturnType<typeof sendProgress>;

const COMMAND_PARSE = "parse-save";
export const parseSave = (data: ArrayBuffer, bypassVersionCheck: boolean) => ({
  type: COMMAND_PARSE as typeof COMMAND_PARSE,
  data,
  bypassVersionCheck,
});
export type ParseSaveCommand = ReturnType<typeof parseSave>;

export const RESPONSE_PARSE_SUCCESS = "parse-save:success";
export const parseSaveSuccess = (saveGame: SaveGame) => ({
  type: RESPONSE_PARSE_SUCCESS as typeof RESPONSE_PARSE_SUCCESS,
  saveGame,
});
export type ParseSaveSuccessResponse = ReturnType<typeof parseSaveSuccess>;

export const RESPONSE_PARSE_ERROR = "parse-save:error";
export const parseSaveError = (error: Error) => ({
  type: RESPONSE_PARSE_ERROR as typeof RESPONSE_PARSE_ERROR,
  error: errorToJson(error),
});
export type ParseSaveErrorResponse = ReturnType<typeof parseSaveError>;

export type ParseSaveResponse =
  | ParseSaveSuccessResponse
  | ParseSaveErrorResponse
  | ProgressResponse;

const COMMAND_WRITE = "write-save";
export const writeSave = (saveGame: SaveGame) => ({
  type: COMMAND_WRITE as typeof COMMAND_WRITE,
  saveGame,
});
export type WriteSaveCommand = ReturnType<typeof writeSave>;

export const RESPONSE_WRITE_SUCCESS = "write-save:success";
export const writeSaveSuccess = (data: ArrayBuffer) => ({
  type: RESPONSE_WRITE_SUCCESS as typeof RESPONSE_WRITE_SUCCESS,
  data,
});
export type WriteSaveSuccessResponse = ReturnType<typeof writeSaveSuccess>;

export const RESPONSE_WRITE_ERROR = "write-save:error";
export const writeSaveError = (error: Error) => ({
  type: RESPONSE_WRITE_ERROR as typeof RESPONSE_WRITE_ERROR,
  error: errorToJson(error),
});
export type WriteSaveErrorResponse = ReturnType<typeof writeSaveError>;

export type WriteSaveResult =
  | WriteSaveSuccessResponse
  | WriteSaveErrorResponse
  | ProgressResponse;

export type SaveParserCommand = ParseSaveCommand | WriteSaveCommand;
export type SaveParserResponse = ParseSaveResponse | WriteSaveResult;

export interface SaveParserCommandEvent extends MessageEvent {
  data: SaveParserCommand;
}

export interface SaveParserResultEvent extends MessageEvent {
  data: SaveParserResponse;
}

export interface ErrorJson {
  name: string;
  message: string;
  stack?: string;
  code?: string | number;
}
export function errorToJson(e: Error): ErrorJson {
  const data: any = {
    name: e.name,
    message: e.message,
    stack: e.stack,
  };

  const code = (e as any).code;
  if (code) {
    data.code = code;
  }

  return data;
}

export function jsonToError(obj: ErrorJson): Error {
  const e = new Error(obj.message);
  e.name = obj.name;
  e.stack = obj.stack;
  (e as any).code = obj.code;
  return e;
}
