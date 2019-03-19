import { GameObject, BehaviorName, GameObjectBehavior } from "oni-save-parser";

export function changeBehaviorTemplateDataState<T extends GameObjectBehavior>(
  gameObject: GameObject,
  behaviorName: BehaviorName<T>,
  templateData: Partial<T["templateData"]>
): GameObject | null {
  const behaviorIndex = gameObject.behaviors.findIndex(
    x => x.name === behaviorName
  );
  if (behaviorIndex === -1) {
    return null;
  }

  // Duplicate game object and behaviors array
  const newGameObject = {
    ...gameObject,
    behaviors: [...gameObject.behaviors]
  };

  // Modify behaviors array with duplicated behavior, and apply the change.
  const oldBehavior = gameObject.behaviors[behaviorIndex];
  newGameObject.behaviors[behaviorIndex] = {
    ...oldBehavior,
    templateData: {
      ...oldBehavior.templateData,
      ...templateData
    }
  };

  return newGameObject;
}
