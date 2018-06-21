import { SaveGame } from "oni-save-parser";

import {
  SaveEditorResultEvent,
  parseSave as parseSaveCommand,
  writeSave as writeSaveCommand
} from "./worker-messages";

import SaveLoadWorker from "worker-loader!./save-serializer.worker";

const worker = new SaveLoadWorker();

export function parseSave(data: ArrayBuffer): Promise<SaveGame> {
  const promise = new Promise<SaveGame>((accept, reject) => {
    const unhook = () => {
      worker.onerror = null;
      worker.onmessage = null;
    };

    worker.onerror = error => reject(error);
    worker.onmessage = (message: SaveEditorResultEvent) => {
      const { data } = message;
      switch (data.type) {
        case "parse-save:success":
          unhook();
          accept(data.saveGame);
          break;
        case "parse-save:error":
          unhook();
          reject(data.error);
      }
    };
  });

  worker.postMessage(parseSaveCommand(data));

  return promise;
}

export function writeSave(saveGame: SaveGame): Promise<ArrayBuffer> {
  const promise = new Promise<ArrayBuffer>((accept, reject) => {
    const unhook = () => {
      worker.onerror = null;
      worker.onmessage = null;
    };

    worker.onerror = error => reject(error);
    worker.onmessage = (message: SaveEditorResultEvent) => {
      const { data } = message;
      switch (data.type) {
        case "write-save:success":
          unhook();
          accept(data.data);
          break;
        case "write-save:error":
          unhook();
          reject(data.error);
      }
    };
  });

  worker.postMessage(writeSaveCommand(saveGame));

  return promise;
}
