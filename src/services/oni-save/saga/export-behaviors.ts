import { takeEvery, select } from "redux-saga/effects";
import { getBehavior, MinionIdentityBehavior } from "oni-save-parser";

import { saveAs } from "file-saver";

import {
  ACTION_ONISAVE_EXPORT_BEHAVIORS,
  ExportBehaviorsAction
} from "../actions/export-behaviors";

import {
  gameObjectTypesByIdSelector,
  gameObjectsByIdSelector
} from "../selectors/save-game";

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

  const exportBehaviors: Record<string, any> = {};
  for (const behaviorName of behaviors) {
    const behavior = getBehavior(gameObject, behaviorName);
    if (!behavior) {
      continue;
    }

    exportBehaviors[behaviorName] = {
      templateData: behavior.templateData,
      extraData: behavior.extraData
    };
  }

  const content = JSON.stringify(
    {
      gameObjectType,
      behaviors: exportBehaviors
    },
    null,
    2
  );

  const blob = new Blob([content], {
    type: "application/javascript;charset=utf-8"
  });

  // TODO: Should have a config file defining valid behavior exports and file name source.
  let fileName = "export.json";
  if (gameObjectType === "Minion") {
    const identity = getBehavior(gameObject, MinionIdentityBehavior);
    if (identity) {
      fileName = `${identity.templateData.name}.json`;
    }
  }

  saveAs(blob, fileName);
}
