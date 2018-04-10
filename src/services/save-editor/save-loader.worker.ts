
import { parseSaveGame, SaveGame } from "oni-save-parser";

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

type SaveLoaderCommands = LoadCommandData;

addEventListener("message", message => {
    const data: SaveLoaderCommands = message.data;
    if (data.command == "load") {
        try {
            const saveGame = parseSaveGame(data.buffer);
            postMessage({
                saveGame: saveGame.toJSON()
            });
        }
        catch (e) {
            postMessage({
                error: e,
                save: null
            });
        }
    }
});