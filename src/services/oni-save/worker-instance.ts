import { SaveGame } from "oni-save-parser";

import {
  RESPONSE_PROGRESS,
  RESPONSE_PARSE_ERROR,
  RESPONSE_PARSE_SUCCESS,
  RESPONSE_WRITE_ERROR,
  RESPONSE_WRITE_SUCCESS,
  SaveParserResultEvent,
  parseSave as parseSaveCommand,
  writeSave as writeSaveCommand,
  jsonToError,
} from "./worker-messages";

import SaveLoadWorker from "worker-loader!./save-serializer.worker";

const worker = new SaveLoadWorker();

export function parseSave(
  data: ArrayBuffer,
  bypassVersionCheck: boolean,
  onProgress?: (message: string) => void
): Promise<SaveGame> {
  const promise = new Promise<SaveGame>((accept, reject) => {
    const unhook = () => {
      worker.onerror = null;
      worker.onmessage = null;
    };

    worker.onerror = (error) => {
      reject(error);
    };
    worker.onmessage = (message: SaveParserResultEvent) => {
      const { data } = message;
      switch (data.type) {
        case RESPONSE_PROGRESS:
          onProgress && onProgress(data.message);
          break;
        case RESPONSE_PARSE_SUCCESS:
          unhook();
          accept(data.saveGame);
          break;
        case RESPONSE_PARSE_ERROR:
          unhook();
          reject(jsonToError(data.error));
          break;
      }
    };
  });

  worker.postMessage(parseSaveCommand(data, bypassVersionCheck));

  return promise;
}

export function writeSave(
  saveGame: SaveGame,
  onProgress?: (message: string) => void
): Promise<ArrayBuffer> {
  const promise = new Promise<ArrayBuffer>((accept, reject) => {
    const unhook = () => {
      worker.onerror = null;
      worker.onmessage = null;
    };

    worker.onerror = (error) => reject(error);
    worker.onmessage = (message: SaveParserResultEvent) => {
      const { data } = message;
      switch (data.type) {
        case RESPONSE_PROGRESS:
          onProgress && onProgress(data.message);
          break;
        case RESPONSE_WRITE_SUCCESS:
          unhook();
          accept(data.data);
          break;
        case RESPONSE_WRITE_ERROR:
          unhook();
          reject(jsonToError(data.error));
          break;
      }
    };
  });

  worker.postMessage(writeSaveCommand(saveGame));

  return promise;
}
