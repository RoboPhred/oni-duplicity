
import { parseSaveGame, SaveGame, writeSaveGame } from "oni-save-parser";

export interface SaveLoaderWorkerData {
    command: string;
}

export interface LoadCommandData {
    command: "load";
    buffer: ArrayBuffer;
}
export interface DataLoadedEvent extends MessageEvent {
    error?: Error;
    save: SaveGame | null;
}

export interface SaveCommandData {
    command: "save";
    save: SaveGame;
}
export interface DataSavedEvent extends MessageEvent {
    error?: Error;
    buffer: ArrayBuffer | null;
}

type SaveLoaderCommands = LoadCommandData | SaveCommandData;

addEventListener("message", message => {
    const data: SaveLoaderCommands = message.data;
    if (data.command === "load") {
        try {
            const saveGame = parseSaveGame(data.buffer);
            postMessage({
                saveGame: saveGame
            });
        }
        catch (e) {
            postMessage({
                error: e,
                save: null
            });
        }
    }
    else if (data.command === "save") {
        try {
            const buffer = writeSaveGame(data.save);
            postMessage({
                buffer
            });
        }
        catch (e) {
            postMessage({
                error: e,
                buffer: null
            });
        }
    }
});