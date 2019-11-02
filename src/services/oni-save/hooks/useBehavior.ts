import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GameObjectBehavior, BehaviorName, getBehavior } from "oni-save-parser";

import { modifyBehavior, BehaviorDataTarget } from "../actions/modify-behavior";
import { gameObjectsByIdSelector } from "../selectors/game-objects";

export interface UseBehavior<T extends GameObjectBehavior> {
  templateData: T["templateData"];
  extraData: T["extraData"];
  onTemplateDataModify(templateData: DeepPartial<T["templateData"]>): void;
  onExtraDataModify(extraData: DeepPartial<T["extraData"]>): void;
};

export default function useBehavior<T extends GameObjectBehavior>(gameObjectId: number, behaviorName: BehaviorName<T>) {
  const dispatch = useDispatch();

  let templateData: T["templateData"] = null;
  let extraData: T["extraData"] = null;

  const gameObjectsById = useSelector(gameObjectsByIdSelector);
  const gameObject = (gameObjectsById && gameObjectsById[gameObjectId]) ? gameObjectsById[gameObjectId] : null;
  if (gameObject) {
    const behavior = getBehavior(gameObject, behaviorName);
    if (behavior) {
      templateData = behavior.templateData;
      extraData = behavior.extraData;
    }
  }

  const onTemplateDataModify = React.useCallback((data: Partial<T["templateData"]>) => {
    dispatch(modifyBehavior(
      gameObjectId,
      behaviorName,
      BehaviorDataTarget.Template,
      data
    ));
  }, [dispatch]);

  const onExtraDataModify = React.useCallback((data: Partial<T["extraData"]>) => {
    dispatch(modifyBehavior(
      gameObjectId,
      behaviorName,
      BehaviorDataTarget.Extra,
      data
    ));
  }, [dispatch]);

  return {
    templateData,
    extraData,
    onTemplateDataModify,
    onExtraDataModify
  };
}