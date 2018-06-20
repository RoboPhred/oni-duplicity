import { call } from "redux-saga/effects";

import { SaveGame } from "oni-save-parser";

import { parseSave } from "../worker-instance";

export function* loadSaveGame(file: File) {
  const data: ArrayBuffer = yield call(readFile, file);
  const saveGame: SaveGame = yield call(parseSave, data);
  return saveGame;
}

function readFile(file: File): Promise<ArrayBuffer> {
  const reader = new FileReader();
  return new Promise<ArrayBuffer>((accept, reject) => {
    reader.onload = () => {
      accept(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsArrayBuffer(file);
  });
}
