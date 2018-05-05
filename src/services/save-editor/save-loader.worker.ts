
import { ContainerModule, injectable, singleton } from "microinject";

import {
    SaveGame,
    ParseStepListener,
    parseSaveGame,
    writeSaveGame,
    ParseStepEventArgs
} from "oni-save-parser";

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

export interface ProgressEvent {
    type: "progress";
    event: "start" | "progress" | "end";
    e: ParseStepEventArgs;
}

export type SaveLoaderCommands = LoadCommandData | SaveCommandData;
export type SaveLoaderEvents = DataLoadedEvent | DataSavedEvent | ProgressEvent;

addEventListener("message", message => {
    const data: SaveLoaderCommands = message.data;
    switch(data.command) {
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

const injectModule = new ContainerModule(bind => {
    bind(ProgressReporter);
});

function doLoad(data: LoadCommandData) {
    try {
        const saveGame = parseSaveGame(data.buffer, injectModule);
        const msg: DataLoadedEvent = {
            type: "loaded",
            saveGame: saveGame
        };
        postMessage(msg);
    }
    catch (e) {
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
        const buffer = writeSaveGame(data.save, injectModule);
        const msg: DataSavedEvent = {
            type: "saved",
            buffer
        };
        postMessage(msg);
    }
    catch (e) {
        const msg: DataSavedEvent = {
            type: "saved",
            error: e,
            buffer: null
        };
        postMessage(msg);
    }
}

@injectable(ParseStepListener)
class ProgressReporter implements ParseStepListener {
    private _depth: number = 0;

    private _lastAnnounce: number = 0;

    onStart(e: ParseStepEventArgs) {
        this._depth++;

        if (this._depth <= 4) {
            const msg: ProgressEvent = {
                type: "progress",
                event: "start",
                e
            };
            postMessage(msg);
        }
    }

    onProgress(e: ParseStepEventArgs) {
        if (this._depth <= 4) {
            const msg: ProgressEvent = {
                type: "progress",
                event: "progress",
                e
            };
            postMessage(msg);
        }
    }

    onEnd(e: ParseStepEventArgs) {
        if (this._depth <= 4) {
            const msg: ProgressEvent = {
                type: "progress",
                event: "end",
                e
            };
            postMessage(msg);
        }
        this._depth--;
    }
}