import { takeEvery, select } from "redux-saga/effects";
import {
  getBehavior,
  MinionIdentityBehavior,
  GameObject
} from "oni-save-parser";
import objectHash from "object-hash";

import { saveAs } from "file-saver";

import {
  ACTION_ONISAVE_EXPORT_BEHAVIORS,
  ExportBehaviorsAction
} from "../actions/export-behaviors";

import {
  gameObjectTypesByIdSelector,
  gameObjectsByIdSelector
} from "../selectors/game-objects";

export default function* exportBehaviorsSaga() {
  yield takeEvery(
    ACTION_ONISAVE_EXPORT_BEHAVIORS,
    handleExportBehaviorsActionSaga
  );
}

function* handleExportBehaviorsActionSaga(action: ExportBehaviorsAction) {
  const { gameObjectId, behaviors } = action.payload;

  const typesById: ReturnType<
    typeof gameObjectTypesByIdSelector
  > = yield select(gameObjectTypesByIdSelector);
  if (!typesById || !typesById[gameObjectId]) {
    return;
  }
  const gameObjectType = typesById[gameObjectId];

  const gameObjectsById: ReturnType<
    typeof gameObjectsByIdSelector
  > = yield select(gameObjectsByIdSelector);
  if (!gameObjectsById || !gameObjectsById[gameObjectId]) {
    return;
  }

  const gameObject = gameObjectsById[gameObjectId];

  // TODO: Should have a config file defining valid behavior exports and file name source.
  let fileName = "export.json";
  if (gameObjectType === "Minion") {
    const identity = getBehavior(gameObject, MinionIdentityBehavior);
    if (identity) {
      fileName = `${identity.templateData.name}.json`;
    }
  }

  const exportObject = buildExportObject(gameObject, gameObjectType, behaviors);
  const content = JSON.stringify(exportObject, null, 2);

  const blob = new Blob([content], {
    type: "application/javascript;charset=utf-8"
  });

  saveAs(blob, fileName);
}

function buildExportObject(
  gameObject: GameObject,
  gameObjectType: string,
  targetBehaviors: string[]
): any {
  const exportBehaviors: Record<string, any> = {};
  for (const behaviorName of targetBehaviors) {
    const behavior = getBehavior(gameObject, behaviorName);
    if (!behavior) {
      continue;
    }

    const exportBehavior: any = (exportBehaviors[behaviorName] = {});
    // We cannot leave any undefined props, as objectHash will include them.
    if (behavior.templateData) {
      exportBehavior.templateData = behavior.templateData;
    }
    if (behavior.extraData) {
      exportBehavior.extraData = behavior.extraData;
    }
  }

  const exportObject: any = {
    gameObjectType,
    behaviors: exportBehaviors
  };

  const hash = objectHash(exportObject, { algorithm: "sha1" });
  exportObject.$sha1 = hash;

  return exportObject;
}
