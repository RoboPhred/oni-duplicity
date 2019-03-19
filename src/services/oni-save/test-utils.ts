import {
  BehaviorName,
  GameObjectBehavior,
  GameObject,
  getBehavior,
  KPrefabIDBehavior
} from "oni-save-parser";

/**
 * Typecasting function to ensure type correctness of behavior data based on name.
 * @param behaviorName The name of the behavior
 * @param data The behavior's data
 */
export function createBehavior<T extends GameObjectBehavior>(
  behaviorName: BehaviorName<T>,
  data: DeepPartial<T>
): DeepPartial<T> {
  return {
    name: behaviorName,
    ...data
  };
}

export function getGameObjectId(gameObject: GameObject): number | null {
  const idBehavior = getBehavior(gameObject, KPrefabIDBehavior);
  if (!idBehavior) {
    return null;
  }

  return idBehavior.templateData.InstanceID;
}
