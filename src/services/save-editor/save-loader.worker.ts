import { SaveGame, parseSaveGame, writeSaveGame } from "oni-save-parser";

export interface SaveLoaderWorkerData {
  command: string;
}

export interface LoadCommandData {
  command: "load";
  buffer: ArrayBuffer;
}
export interface DataLoadedEvent {
  type: "loaded";
  error?: Error;
  saveGame: SaveGame | null;
}

export interface SaveCommandData {
  command: "save";
  save: SaveGame;
}
export interface DataSavedEvent {
  type: "saved";
  error?: Error;
  buffer: ArrayBuffer | null;
}

export type SaveLoaderCommands = LoadCommandData | SaveCommandData;
export type SaveLoaderEvents = DataLoadedEvent | DataSavedEvent;

addEventListener("message", message => {
  const data: SaveLoaderCommands = message.data;
  switch (data.command) {
    case "load": {
      doLoad(data);
      return;
    }
    case "save": {
      doSave(data);
      return;
    }
  }
});

function doLoad(data: LoadCommandData) {
  try {
    const saveGame = parseSaveGame(data.buffer);
    const msg: DataLoadedEvent = {
      type: "loaded",
      saveGame: saveGame
    };
    postMessage(msg);
  } catch (e) {
    const msg: DataLoadedEvent = {
      type: "loaded",
      error: e,
      saveGame: null
    };
    postMessage(msg);
  }
}

function doSave(data: SaveCommandData) {
  try {
    const buffer = writeSaveGame(data.save);
    const msg: DataSavedEvent = {
      type: "saved",
      buffer
    };
    postMessage(msg);
  } catch (e) {
    const msg: DataSavedEvent = {
      type: "saved",
      error: e,
      buffer: null
    };
    postMessage(msg);
  }
}
