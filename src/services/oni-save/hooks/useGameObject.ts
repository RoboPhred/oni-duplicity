import { useSelector } from "react-redux";
import { gameObjectTypesByIdSelector } from "../selectors/game-objects";

export interface UseGameObject {
  gameObjectType: string;
}
export default function useGameObject(gameObjectId: number): UseGameObject {
  const typesById = useSelector(gameObjectTypesByIdSelector);
  const gameObjectType = typesById[gameObjectId];
  return {
    gameObjectType
  };;
}
