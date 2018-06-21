import { call } from "redux-saga/effects";

import { SaveGame } from "oni-save-parser";

import { writeSave } from "../worker-instance";

export function* writeSaveGame(saveGame: SaveGame) {
  const data: ArrayBuffer = yield call(writeSave, saveGame);
  const blob = new Blob([data]);
  return blob;
}
