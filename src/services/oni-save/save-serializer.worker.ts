import {
  parseSaveGame,
  writeSaveGame,
  progressReporter
} from "oni-save-parser";

import {
  SaveParserCommandEvent,
  ParseSaveCommand,
  WriteSaveCommand,
  parseSaveError,
  parseSaveSuccess,
  writeSaveError,
  writeSaveSuccess,
  sendProgress
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
    const save = parseSaveGame(command.data, injector);
    postMessage(parseSaveSuccess(save));
  } catch (e) {
    postMessage(parseSaveError(e));
  }
}

function writeSave(command: WriteSaveCommand) {
  const injector = progressReporter(onProgress);

  try {
    const data = writeSaveGame(command.saveGame, injector);
    postMessage(writeSaveSuccess(data));
  } catch (e) {
    postMessage(writeSaveError(e));
  }
}

let lastProgress: number = 0;
function onProgress(message: string) {
  // This reports lethargically and hangs on messages that are not
  //  the object which is slowing us down.
  // TODO: Move elapse timer to progressReporter() logic queue
  //  up the last message to send when elapsed.
  const elapsed = Date.now() - lastProgress;
  if (elapsed > 200) {
    postMessage(sendProgress(message));
  }
}
