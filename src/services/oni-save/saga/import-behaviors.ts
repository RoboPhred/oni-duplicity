import { takeEvery, call, select, put } from "redux-saga/effects";
import objectHash from "object-hash";

import {
  ACTION_ONISAVE_IMPORT_BEHAVIORS,
  ImportBehaviorsAction
} from "../actions/import-behaviors";
import { mergeBehaviors } from "../actions/merge-behaviors";

import { gameObjectTypesByIdSelector } from "../selectors/save-game";

export default function* importBehaviorsSaga() {
  yield takeEvery(ACTION_ONISAVE_IMPORT_BEHAVIORS, handleImportBehaviorsSaga);
}

function* handleImportBehaviorsSaga(action: ImportBehaviorsAction) {
  const { gameObjectId, file } = action.payload;

  function onError(message: string) {
    // TODO: show dialog.
    console.error(message);
  }

  const contentStr = yield call(readFile, file);

  let content: any;
  try {
    content = JSON.parse(contentStr);
  } catch (e) {
    onError("Invalid import data.");
    return;
  }

  // TODO: validate data shape

  const sha1 = content.$sha1;
  delete content.$sha1;
  const contentSha1 = objectHash(content, { algorithm: "sha1" });
  if (sha1 !== contentSha1) {
    // TODO: Show yes/no dialog and allow unmatching data to be used.
    onError(
      "Content checksum does not match.  Modified export data has a risk of corrupting the save file."
    );
    return;
  }

  const { gameObjectType, behaviors } = content;

  const gameObjectTypesById = yield select(gameObjectTypesByIdSelector);
  if (gameObjectTypesById[gameObjectId] !== gameObjectType) {
    onError("Import data game object type does not match.");
    return;
  }

  yield put(mergeBehaviors(gameObjectId, behaviors));
}

function readFile(file: File): Promise<string> {
  const reader = new FileReader();
  return new Promise<string>((accept, reject) => {
    reader.onload = () => {
      accept(reader.result as string);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsText(file);
  });
}
