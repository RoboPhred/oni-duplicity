import { parseSaveGame, writeSaveGame } from "oni-save-parser";

import {
  SaveParserCommandEvent,
  ParseSaveCommand,
  WriteSaveCommand,
  parseSaveError,
  parseSaveSuccess,
  writeSaveError,
  writeSaveSuccess,
  sendProgress,
} from "./worker-messages";

addEventListener("message", handleMessage);

function handleMessage(message: SaveParserCommandEvent) {
  const { data: command } = message;
  if (!command || !command.type) {
    return;
  }

  switch (command.type) {
    case "parse-save":
      return parseSave(command);
    case "write-save":
      return writeSave(command);
  }
}

function parseSave(command: ParseSaveCommand) {
  const injector = progressReporter(onProgress);

  try {
    const save = parseSaveGame(command.data, {
      versionStrictness: command.bypassVersionCheck ? "major" : "minor",
      interceptor: injector,
    });
    postMessage(parseSaveSuccess(save));
  } catch (e: any) {
    postMessage(parseSaveError(e));
  }
}

function writeSave(command: WriteSaveCommand) {
  const injector = progressReporter(onProgress);

  try {
    const data = writeSaveGame(command.saveGame, injector);
    postMessage(writeSaveSuccess(data));
  } catch (e: any) {
    postMessage(writeSaveError(e));
  }
}

// Copied from progressReporter of oni-save-parser and
//  modified to debounce messages
let messageQueueTime = 0;
let messageQueue: string | null = null;
function progressReporter(
  onProgress: (message: string) => void
): (value: any) => any {
  return (instruction: { type: "progress"; message: string }) => {
    // Check if its time to emit a message.
    if (messageQueue && messageQueueTime + 200 < Date.now()) {
      onProgress(messageQueue);
      messageQueue = null;
      messageQueueTime = 0;
    }

    // Check if we have a message to queue up.
    if (instruction && instruction.type === "progress") {
      messageQueue = instruction.message;
      if (messageQueueTime === 0) {
        // Only set the time if we are not already set
        //  This ensures only the most recent message in
        //  the debounce time is sent.
        messageQueueTime = Date.now();
      }
    }
    return instruction;
  };
}

let lastProgress: number = 0;
function onProgress(message: string) {
  const elapsed = Date.now() - lastProgress;
  if (elapsed > 200) {
    postMessage(sendProgress(message));
  }
}
