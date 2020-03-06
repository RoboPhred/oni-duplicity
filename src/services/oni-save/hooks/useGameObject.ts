import { useSelector } from "react-redux";
import { Vector3 } from "oni-save-parser";
import {
  gameObjectTypesByIdSelector,
  gameObjectsByIdSelector
} from "../selectors/game-objects";

export interface UseGameObject {
  gameObjectType: string | undefined;
  position: Vector3 | undefined;
}
export default function useGameObject(gameObjectId: number): UseGameObject {
  const typesById = useSelector(gameObjectTypesByIdSelector);
  const gameObjectsById = useSelector(gameObjectsByIdSelector);
  const gameObjectType = typesById[gameObjectId];
  const { position } = gameObjectsById[gameObjectId] || {};
  return {
    gameObjectType,
    position
  };
}
