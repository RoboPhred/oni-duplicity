import { parseSaveGame, writeSaveGame } from "oni-save-parser";

import {
  SaveEditorCommandEvent,
  ParseSaveCommand,
  WriteSaveCommand,
  parseSaveError,
  parseSaveSuccess,
  writeSaveError,
  writeSaveSuccess
} from "./worker-messages";

addEventListener("message", handleMessage);

function handleMessage(message: SaveEditorCommandEvent) {
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
  try {
    const save = parseSaveGame(command.data);
    postMessage(parseSaveSuccess(save));
  } catch (e) {
    postMessage(parseSaveError(e));
  }
}

function writeSave(command: WriteSaveCommand) {
  try {
    const data = writeSaveGame(command.saveGame);
    postMessage(writeSaveSuccess(data));
  } catch (e) {
    postMessage(writeSaveError(e));
  }
}
